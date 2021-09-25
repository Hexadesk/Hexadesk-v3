import Model from '../Models/Model';
import mongoose from 'mongoose';
import inviteToBoardEmailHandler from './emails/inviteToBoardEmail';
import notificationHandler from './notification';

const addMemberToBoard = async (req, res, next) => {
    const { name } = req.user;
    const { boardId, boardName, email, role } = req.body;
    const count = await Model.BoardModel.find(
        { _id: boardId, members: { $elemMatch: { email } } }
    ).countDocuments();
    if (count > 0) {
        res.status(400);
        next(new Error('Member Already Exists!'));
    } else {
        const member = { email, role };
        Model.BoardModel.findByIdAndUpdate(
            boardId,
            { $push: { members: member } },
            { upsert: true, new: true },
            async (err, doc) => {
                if (err) {
                    res.status(500);
                    next(new Error('Internal Server Error!'));
                } else {
                    // adding notification
                    Model.UserModel.findOne({ email }).then(userr => {
                        if (userr) {
                            const data = {
                                userId: userr._id,
                                text: 'You are invited to',
                                type: 'invite',
                                itemTitle: '',
                                by: name
                            };
                            NotificationHandler.addNotification(add);
                        } else { }
                    }).catch(err => { })
                    const data = {
                        email,
                        boardId,
                        senderName: name,
                        boardName,
                    };
                    await inviteToBoardEmailHandler.emailToExec(req, res, next,
                        data,
                        process.env.SERVICE_EMAIL,
                        'Invitation',
                        email
                    );
                    res.status(200).send({ message: 'Member Added' });
                }
            },
        );
    }
}

const acceptBoardInviteOnSignup = (boardId, userId) => {
    Model.BoardModel.find({ _id: boardId }).then(boards => {
        if (boards.length > 0) {
            if (boards[0].members.length > 0) {
                boards[0].members.map(member => {
                    if (member.id == userId) {
                        member.joinedStatus = true;
                    }
                });
                boards[0].save().then(savedBoard => {
                    console.log('joined');
                });
            }
        }
    }).catch(err => { });
}

const responseToBoardInvite = (req, res, next) => {
    const { boardId, email, status } = req.body;
    Model.BoardModel.find({ _id: boardId }).then(boards => {
        if (boards.length > 0) {
            if (boards[0].members.length > 0) {
                boards[0].members.map((member, index) => {
                    if (member.email == email) {
                        if (status == true) {
                            member.joinedStatus = true;
                        } else {
                            boards[0].members.splice(index, 1);
                        }
                    }
                });
                boards[0].save().then(savedBoard => {
                    res.status(200).send({ message: 'Member Status Updated' });
                });
            } else {
                res.status(404);
                next(new Error('Member data Not Found!'));
            }
        } else {
            res.status(404);
            next(new Error('Board Not Found!'));
        }
    }).catch(err => {
        res.status(500);
        next(new Error('Internal Server Error!'));
    });
}

const clickOnInvite = async (req, res, next) => {
    const { boardId, email } = req.body;
    const count = await Model.UserModel.find({ email }).countDocuments();
    if (count > 0) {
        Model.BoardModel.findOne({ _id: boardId }).select('title').then(board => {
            if (board) {
                res.status(200).send({ userFound: true, board });
            } else {
                res.status(404);
                next(new Error('Board Not Found!'));
            }
        }).catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
    } else {
        res.status(200).send({ userFound: false, board: null });
    }

}

const addBoard = async (req, res, next) => {
    const { title, description, members } = req.body;
    const { _id, name, email } = req.user;
    let allMembers = members;
    if (members == undefined) {
        allMembers = [];
    }
    allMembers.push({ id: _id, email: email, role: "Project Manager" });
    const newBoard = new Model.BoardModel({
        userId: _id,
        title,
        description,
        members: allMembers,
    });
    newBoard.save()
        .then(async savedBoard => {
            if (savedBoard.members.length > 0) {
                await savedBoard.members.map(memb => {
                    const data = {
                        email: memb.email,
                        boardId: savedBoard._id,
                        senderName: name,
                        boardName: savedBoard.title
                    };
                    inviteToBoardEmailHandler.emailToExec(req, res, next,
                        data,
                        process.env.SERVICE_EMAIL,
                        'Invitation To Board',
                        memb.email
                    );
                });
            }
            res.status(201).send({ savedBoard })
        })
        .catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const updateBoard = async (req, res, next) => {
    const { id } = req.params;
    const query = { $set: req.body };
    Model.BoardModel.findByIdAndUpdate(
        id,
        query,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) {
                res.status(500);
                next(
                    new Error(
                        'Internal Server Error!',
                    ),
                );
            } else {
                //notification
                const data = {
                    by: req.user.name,
                    boardId: doc._id,
                    text: `${req.user.name} updated a board ${doc.title}`,
                    type: 'board'
                }
                if (doc.members.length > 0) {
                    sendNotification(data, doc.members);
                }
                res.status(200).send({ doc });
            }
        }
    );
}

const getSingleBoard = (req, res, next) => {
    Model.BoardModel.findOne({ _id: req.params.id })
        .exec()
        .then(board => {
            if (!board) {
                res.status(404);
                next(new Error('Board with given id was not found!'));
            } else {
                res.status(200).send({ board })
            }
        })
        .catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const getAllBoards = async (req, res, next) => {
    const { _id, email } = req.user;
    const objectId = mongoose.Types.ObjectId(_id);
    try {
        const myBoards = await Model.BoardModel.aggregate(
            [{ $match: { userId: objectId } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'members.email',
                    foreignField: 'email',
                    as: 'boardMembers',
                },
            },
            ]).sort({ createdAt: -1 });
        const otherRoleBoards = await Model.BoardModel.aggregate(
            [{ $match: { members: { $elemMatch: { email } } } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'members.email',
                    foreignField: 'email',
                    as: 'boardMembers',
                },
            },
            ]).sort({ createdAt: -1 });
        // const myBoards = await Model.BoardModel.find({ userId: _id });
        // const otherRoleBoards = await Model.BoardModel.find(
        //     { members: { $elemMatch: { email } } }
        // )
        res.status(200).send({ myBoards, otherRoleBoards });
    }
    catch (error) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
};

const getAllMembersInBoard = async (req, res, next) => {
    const { id } = req.params;
    const objectId = mongoose.Types.ObjectId(id);
    Model.BoardModel.aggregate(
        [{ $match: { _id: objectId } },
        {
            $lookup: {
                from: 'users',
                localField: 'members.email',
                foreignField: 'email',
                as: 'boardMembers',
            },
        },
        ])
        .then(async members => {
            if (members.length > 0) {
                if (members[0].members.length > 0) {
                    members[0].members.map(async (el, index) => {
                        const itemsCount = await Model.ItemModel.find(
                            { $or: [{ assignedTo: { $elemMatch: { email: el.email } } }, { cc: { $elemMatch: { email: el.email } } }] }
                        ).countDocuments();
                        if (members[0].boardMembers.length > 0) {
                            members[0].boardMembers.map((bm, ind) => {
                                if (el.email == bm.email) {
                                    members[0].boardMembers[ind].role = el.role;
                                    members[0].boardMembers[ind].totalItems = itemsCount;
                                }
                            })
                        }
                        if (members[0].members.length == index + 1) {
                            res.status(200).send({ members: members[0].boardMembers });
                        }
                    })
                } else {
                    res.status(200).send({ members: [] });
                }
            }
            else {
                res.status(500);
                next(new Error('Internal Server Error!'));
            }
        })
        .catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const deleteBoard = async (req, res, next) => {
    const { id } = req.params;
    // send Notification
    const boardd = await Model.BoardModel.find({ _id: id }).select('title members');
    Model.BoardModel.findByIdAndRemove(id, (err, result) => {
        if (result) {
            if (boardd.length > 0) {
                const data = {
                    by: req.user.name,
                    boardId: id,
                    text: `${req.user.name} deleted a board ${boardd[0].title}`,
                    type: 'board'
                }
                if (boardd[0].members.length > 0) {
                    sendNotification(data, boardd[0].members);
                }
            }
            res.status(200).send({
                message: 'Board Deleted Successfully.',
            });
        } else {
            res.status(500);
            next(new Error('Internal Server Error!'));
        }
    });
};

const sendNotification = (data, members) => {
    members.map(el => {
        let newData = data;
        newData.email = el.email;
        notificationHandler.addNotification(newData);
    });
}


const removeMemberFromBoard = (req, res, next) => {
    const { id } = req.params;
    const { memberEmail } = req.body;
    Model.BoardModel.updateOne(
        { _id: id },
        { $pull: { members: { email: memberEmail } } },
        { multi: true },
        (err, doc) => {
            if (err) {
                res.status(500);
                next(new Error('Internal Server Error!'));
            } else {
                res.status(200).send({ doc });
            }
        }
    );
};

export default { addBoard, removeMemberFromBoard, getAllBoards, getAllMembersInBoard, getSingleBoard, updateBoard, addMemberToBoard, acceptBoardInviteOnSignup, deleteBoard, clickOnInvite, responseToBoardInvite }