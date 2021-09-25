import mongoose from 'mongoose';
import Model from '../Models/Model';
// import uploadMutipleFiles from '../utils/upload';
import awsHandler from './aws';
import notificationHandler from './notification';

const testt = async (req, res, next) => {
    const firstObj = {
        apple: "apple",
        coconut: "cocunut",
        shape: "shape",
        ironArrayOfObj: [
            {
                aoo11: 'aoo11',
                aoo12: 'aoo12'
            },
            {
                aoo21: 'aoo21',
                aoo22: 'aoo22'
            },
            {
                aoo31: 'aoo31',
                aoo32: 'aoo32'
            }
        ],
        ironObj: {
            io1: "io1",
            io2: "io2"
        },
        ironArray: ["io1", "io2", "io3"]
    };
    const secondObj = {
        shape: "shape",
        ironArrayOfObj: [
            {
                aoo11: 'aoo11',
                aoo12: 'aoo12'
            },
            {
                aoo21: 'aoo21',
                aoo22: 'aoo22'
            },
            {
                aoo31: 'aoo33',
                aoo32: 'aoo32'
            }
        ],
        ironObj: {
            io1: "io1",
            io2: "io3"
        },
        ironArray: ["io1", "io3", "io3"]
    };
    const keys = Object.keys(firstObj);
    const secKeys = Object.keys(secondObj);
    let notiValArr = [];
    if (keys.length > 0) {
        keys.map((key, index) => {
            const found = secKeys.indexOf(key);
            if (found !== -1) {
                console.log(firstObj[key], secondObj[key]);
                if (JSON.stringify(firstObj[key]) !== JSON.stringify(secondObj[key])) {
                    notiValArr.push(key);
                }
            }
            if (keys.length - 1 == index) {
                res.send({ notiValArr });
            }
        });
    }
}

const uploadDocument = async (req, res, next) => {
    try {
        if (req.file !== undefined) {
            const url = await awsHandler.UploadToAws(req.file);
            res.status(200).send({ url, name: req.file.originalname });
        } else {
            res.status(400);
            next(new Error('File is required!'));
        }
    }
    catch (error) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
}

const deleteDocument = (req, res, next) => {
    const { id } = req.params;
    const { documentId } = req.body;
    Model.ItemModel.updateOne(
        { _id: id },
        { $pull: { documents: { _id: documentId } } },
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


const successfullyAddItem = (req, res, next, filesArray) => {
    const { title, description, boardId, assignedTo, dueDate, startDate, cc, documentType, status, links, priority } = req.body;
    let ccArray = [];
    let assignedToArray = [];
    let linksArray = [];
    if (assignedTo !== undefined) {
        assignedToArray = JSON.parse(assignedTo);
        if (assignedToArray.length > 0) {
            assignedToArray.push({ email: req.user.email, id: req.user._id, role: 'contractor', status: 'in progress' });
        } else {
            assignedToArray.push({ email: req.user.email, id: req.user._id, role: 'contractor', status: 'todo' });
        }
    }
    if (cc !== undefined) {
        ccArray = JSON.parse(cc);
        // ccArray.push({ email: req.user.email, id: req.user._id, role: 'contractor', status: 'todo' });
    }
    if (links !== undefined) {
        linksArray = JSON.parse(links);
    }
    const documentTypee = JSON.parse(documentType);
    const statuss = JSON.parse(status);
    const priorityy = JSON.parse(priority);
    const newItem = new Model.ItemModel({
        boardId,
        title,
        createdBy: req.user._id,
        description,
        assignedTo: assignedToArray,
        cc: ccArray,
        documentType: documentTypee,
        status: statuss,
        priority: priorityy,
        links: linksArray,
        dueDate,
        startDate,
        documents: filesArray
    });
    newItem.save()
        .then(async savedItem => {
            // send Notification
            const boardd = await Model.BoardModel.find({ _id: boardId }).select('title members');
            if (boardd.length > 0) {
                const data = {
                    by: req.user.name,
                    itemId: savedItem._id,
                    boardId: boardId,
                    text: `${req.user.name} added new item ${title} in a board ${boardd[0].title}`,
                    type: 'item'
                }
                if (boardd[0].members.length > 0) {
                    sendNotification(data, boardd[0].members);
                }
            }
            res.status(201).send({ savedItem });
        })
        .catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
}

const sendNotification = (data, members) => {
    console.log('members inside notification send func', members);
    members.map(el => {
        let newData = data;
        newData.email = el.email;
        notificationHandler.addNotification(newData);
    });
}


const addItem = async (req, res, next) => {
    if (req.files !== undefined && req.files.length > 0) {
        let filesArray = [];
        req.files.map(async (file, index) => {
            const url = await awsHandler.UploadToAws(file);
            filesArray.push({ url, name: file.originalname });
            if (req.files.length == index + 1) {
                console.log('success');
                successfullyAddItem(req, res, next, filesArray);
            }
        });
    } else {
        let filesArray = [];
        successfullyAddItem(req, res, next, filesArray);
    }

};

const addNewVersion = (data) => {
    return new Promise((resolve, reject) => {
        console.log('inside new verson add #######################3');
        // console.log(data);
        let newData = data.toObject();
        newData.history.push({
            previousVersionId: newData._id
        });
        delete newData._id;
        newData.assignedTo.map(el => {
            delete el._id;
        });
        newData.cc.map(el => {
            delete el._id;
        });
        newData.documents.map(el => {
            delete el._id;
        });
        newData.isArchived = false;
        console.log('newData after deletinggggggg ##########################################');
        // console.log(newData);
        const newItem = new Model.ItemModel(newData);
        // console.log(newItem);
        newItem.save()
            .then(savedItem => {
                // console.log('saved new version', savedItem);
                resolve(savedItem);
            })
            .catch(err => {
                console.log(err);
                console.log('inside reh=ject of promise');
                reject("Can not update!");
            });
    });
}

const updateItem = async (req, res, next) => {
    // console.log('requestcoming', req.body);
    const { id } = req.params;
    // activity
    console.log('adding activity');
    if (req.body.commentText !== undefined) {
        const newActivity = { text: req.body.commentText, userId: req.user._id, createdAt: Date.now() };
        Model.ItemModel.findByIdAndUpdate(
            id,
            { $push: { activity: newActivity } },
            { upsert: true, new: true },
            async (err, doc) => {
                if (err) { } else { }
            });
    }
    // now will find the item to update and will create its new version and will set {isArchived == true} in previous version
    Model.ItemModel.findByIdAndUpdate(
        id,
        { $set: { isArchived: true } },
        { upsert: true, new: true },
        async (err, item) => {
            if (err) {
                console.log('setting archved to true caused error');
                res.status(500);
                next(new Error('Internal Server Error!'));
            } else {
                console.log('item is found and archived set to true');
                let newItem = item;
                addNewVersion(newItem).then(async savedItem => {
                    console.log('comparing objects for preparing nptiification#########################$$4$$$$');
                    const keys = Object.keys(req.body);
                    const secKeys = Object.keys(newItem.toObject());
                    let notiValArr = [];
                    console.log(keys);
                    console.log(secKeys);
                    keys.map(k => console.log(typeof k));
                    secKeys.map(k => console.log(typeof k));
                    if (keys.length > 0) {
                        keys.map((key, index) => {
                            const found = secKeys.indexOf(key);
                            console.log(found);
                            if (found !== -1) {
                                console.log(`${key}: value in request >>${req.body[key]}, value in collec>>>${newItem[key]}`);
                                // start date format for comparing
                                if (key == 'startDate') {
                                    var month = newItem[key].getMonth() + 1; //months from 1-12
                                    var day = newItem[key].getDate();
                                    var year = newItem[key].getFullYear();
                                    month < 10 ? month = `0${month}` : null;
                                    day < 10 ? day = `0${day}` : null;
                                    const newData = year + "-" + month + "-" + day;
                                    if (JSON.stringify(req.body[key]) !== JSON.stringify(newData)) {
                                        notiValArr.push(key);
                                    }
                                    console.log(req.body[key], newData);
                                }
                                // end date format for comparing
                                else if (key == 'dueDate') {
                                    var month = newItem[key].getMonth() + 1; //months from 1-12
                                    var day = newItem[key].getDate();
                                    var year = newItem[key].getFullYear();
                                    month < 10 ? month = `0${month}` : null;
                                    day < 10 ? day = `0${day}` : null;
                                    const newData = year + "-" + month + "-" + day;
                                    if (JSON.stringify(req.body[key]) !== JSON.stringify(newData)) {
                                        notiValArr.push(key);
                                    }
                                    console.log(req.body[key], newData);
                                } else if (key == 'assignedTo') {
                                    console.log(newItem[key].length);
                                    if (newItem[key].length !== req.body[key].length) {
                                        notiValArr.push(key);
                                    }

                                } else if (key == 'cc') {
                                    if (newItem[key].length !== req.body[key].length) {
                                        notiValArr.push(key);
                                    }
                                }
                                else {
                                    if (JSON.stringify(req.body[key]) !== JSON.stringify(newItem[key])) {
                                        notiValArr.push(key);
                                    }
                                }
                            }
                            if (keys.length - 1 == index) {
                                console.log({ notiValArr });
                            }
                        });
                    }
                    console.log('comparing objects for preparing nptiification#########################$$4$$$$');
                    console.log('back from promise of add new version now updating this....');
                    if (req.body.assignedTo && req.body.assignedTo.length > 1) {
                        req.body.assignedTo.map(el => {
                            if (el.role == 'contractor') {
                                el.status = 'in progress';
                            }
                        })
                    }
                    const query = { $set: req.body };
                    Model.ItemModel.findByIdAndUpdate(
                        savedItem._id,
                        query,
                        { upsert: true, new: true },
                        async (err, doc) => {
                            if (err) {
                                res.status(500);
                                next(new Error(`Internal Server Error!`));
                            } else {
                                // console.log('updated data', doc);
                                // send Notification
                                const boardd = await Model.BoardModel.find({ _id: doc.boardId }).select('title members');
                                if (boardd.length > 0) {
                                    const data = {
                                        by: req.user.name,
                                        itemId: doc._id,
                                        prevVersionId: item._id,
                                        boardId: doc.boardId,
                                        text: `${req.user.name} updated ${JSON.stringify(notiValArr)} ${notiValArr.length > 0 ? "fields of" : ""} item ${doc.title} in a board ${boardd[0].title}`,
                                        type: 'item_update'
                                    }

                                    console.log('preparing notification data', data);
                                    // getting members email who are assignedTo or cc
                                    let membersArr = [];
                                    doc.assignedTo.map(el => {
                                        membersArr.push({ email: el.email });
                                    });
                                    doc.cc.map(el => {
                                        let found = membersArr.find(o => o.email === el.email);
                                        if (!found) {
                                            membersArr.push({ email: el.email });
                                        }
                                    });
                                    // if (boardd[0].members.length > 0) {
                                    //     sendNotification(data, boardd[0].members);
                                    // }

                                    console.log('members to send notifications');
                                    if (membersArr.length > 0) {
                                        sendNotification(data, membersArr);
                                    }
                                }
                                res.status(200).send({ message: 'Item Updated', doc });
                            }
                        }
                    );
                }).catch(err => {
                    console.log('last catch error', err);
                    res.status(500);
                    next(new Error('Internal Server Error!'));
                })
            }
        });
}

const updateItemUpdateType = async (req, res, next) => {
    const { id } = req.params;
    const { updateType } = req.body;
    let bodyData = req.body;
    if (updateType == 'file' && req.file !== undefined) {
        const url = await awsHandler.UploadToAws(req.file);
        bodyData.update = url;
    }
    const query = { $set: bodyData };
    Model.ItemModel.findByIdAndUpdate(
        id,
        query,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) {
                res.status(500);
                next(new Error(`Internal Server Error!`));
            } else {
                res.status(200).send({ doc });
            }
        }
    );
}

const updateItemDocument = async (req, res, next) => {
    const { id } = req.params;
    if (req.file !== undefined) {
        const url = await awsHandler.UploadToAws(req.file);
        const query = { $set: { doc: url } };
        Model.ItemModel.findByIdAndUpdate(
            id,
            query,
            { upsert: true, new: true },
            (err, doc) => {
                if (err) {
                    res.status(500);
                    next(
                        new Error(
                            `Internal Server Error!`,
                        ),
                    );
                } else {
                    res.status(200).send({ doc });
                }
            }
        );
    } else {
        res.status(400);
        next(new Error(`File is Required!`));
    }

}


const getSingleItem = (req, res, next) => {
    Model.ItemModel.findOne({ _id: req.params.id })
        .populate('assignedTo.id', 'name email imageUrl companyName')
        .populate('cc.id', 'name email imageUrl companyName')
        .populate('activity.userId', 'name email imageUrl companyName')
        .populate('createdBy', 'name email imageUrl companyName')
        .then(item => {
            if (!item) {
                res.status(404);
                next(new Error('Item not found!'));
            } else {
                res.status(200).send({ item })
            }
        })
        .catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const getAllItemsOfBoard = async (req, res, next) => {
    const { bid } = req.params;
    Model.ItemModel.find({ boardId: bid, isArchived: false })
        .populate('assignedTo.id', 'name email imageUrl companyName')
        .populate('cc.id', 'name email imageUrl companyName')
        .populate('createdBy', 'name email imageUrl companyName')
        .populate('activity.userId', 'name email imageUrl companyName')
        .sort({ createdAt: -1 })
        .then(items => {
            res.status(200).send({ items });
        }).
        catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const getAllItemsOfUserByBoard = async (req, res, next) => {
    const { bid } = req.params;
    const { _id } = req.user;
    Model.ItemModel.find({ boardId: bid, assignedTo: { $elemMatch: { id: _id } }, isArchived: false })
        .populate('assignedTo.id', 'name email imageUrl companyName')
        .populate('cc.id', 'name email imageUrl companyName')
        .populate('activity.userId', 'name email imageUrl companyName')
        .populate('createdBy', 'name email imageUrl companyName').sort({ createdAt: -1 }).then(items => {
            res.status(200).send({ items });
        }).
        catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const searchItemsByFilter = async (req, res, next) => {
    const { text = "", status = '', documentType = '', boardId = '' } = req.query;
    const { _id } = req.user;
    const id = _id;
    let query = { isArchived: false };
    if (boardId !== '') {
        query.boardId = boardId;
        if (status !== '') {
            const regex = new RegExp(["^", status, "$"].join(""), "i");
            query["status.label"] = regex;
        }
        if (documentType !== '') {
            const regex = new RegExp(["^", documentType, "$"].join(""), "i");
            query["documentType.label"] = regex;
        }
        if (text !== '') {
            query.$or = [];
            let formattedText = text;
            formattedText = formattedText.split(' ');
            formattedText.map(field => {
                query.$or.push(
                    {
                        title: new RegExp(field.trim(), 'i'),
                    },
                    {
                        description: new RegExp(field.trim(), 'i'),
                    },
                    {
                        "priority.label": new RegExp(field.trim(), 'i'),
                    },
                );
            });
        }
        // if (status !== '') {
        //     let statusObj = {};
        //     const regex = new RegExp(["^", status, "$"].join(""), "i");
        //     statusObj["status.label"] = regex;
        //     query.$or.push(statusObj);
        // }
        // if (documentType !== '') {
        //     let statusObj = {};
        //     const regex = new RegExp(["^", documentType, "$"].join(""), "i");
        //     statusObj["documentType.label"] = regex;
        //     query.$or.push(statusObj);
        // }
        // if (text !== '') {
        //     let or = [];
        //     let formattedText = text;
        //     formattedText = formattedText.split(' ');
        //     formattedText.map(field => {
        //         query.$or.push(
        //             {
        //                 title: new RegExp(field.trim(), 'i'),
        //             },
        //             {
        //                 description: new RegExp(field.trim(), 'i'),
        //             },
        //             {
        //                 "priority.label": new RegExp(field.trim(), 'i'),
        //             },
        //         );
        //     });
        // }
        // if (query.$or.length == 0) {
        //     query = { boardId: query.boardId };
        // }
    } else {
        let or = [];
        // if (status !== '') {
        //     let statusObj = {};
        //     const regex = new RegExp(["^", status, "$"].join(""), "i");
        //     statusObj["status.label"] = regex;
        //     or.push(statusObj);
        // }
        // if (documentType !== '') {
        //     let statusObj = {};
        //     const regex = new RegExp(["^", documentType, "$"].join(""), "i");
        //     statusObj["documentType.label"] = regex;
        //     or.push(statusObj);
        // }
        if (status !== '') {
            const regex = new RegExp(["^", status, "$"].join(""), "i");
            query["status.label"] = regex;
        }
        if (documentType !== '') {
            const regex = new RegExp(["^", documentType, "$"].join(""), "i");
            query["documentType.label"] = regex;
        }
        if (text !== '') {
            let formattedText = text;
            formattedText = formattedText.split(' ');
            formattedText.map(field => {
                or.push(
                    {
                        title: new RegExp(field.trim(), 'i'),
                    },
                    {
                        description: new RegExp(field.trim(), 'i'),
                    },
                    {
                        "priority.label": new RegExp(field.trim(), 'i'),
                    },
                );
            });
        }
        if (or.length > 0) {
            query.$and = [{
                $or: [
                    { assignedTo: { $elemMatch: { id } } },
                    { cc: { $elemMatch: { id } } },
                    { createdBy: id }
                ]
            }, { $or: or }];
        } else {
            query.$or = [
                { assignedTo: { $elemMatch: { id } } },
                { cc: { $elemMatch: { id } } },
                { createdBy: id }
            ];
        }

    }
    Model.ItemModel.find(query)
        .populate('assignedTo.id', 'name email imageUrl companyName')
        .populate('cc.id', 'name email imageUrl companyName')
        .populate('activity.userId', 'name email imageUrl companyName')
        .populate('createdBy', 'name email imageUrl companyName').sort({ createdAt: -1 }).then(items => {
            res.status(200).send({ items });
        }).catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!' + error));
        });
    //     query.$or = [
    //         { assignedTo: { $elemMatch: { id } } },
    //         { cc: { $elemMatch: { id } } },
    //         { createdBy: id }
    //     ]
    // } else {
    //     query.boardId = boardId;
    //     }
    // if (type == 'status') {
    //     if (boardId == '') {
    //         query = {
    //             $or: [
    //                 { assignedTo: { $elemMatch: { id } } },
    //                 { cc: { $elemMatch: { id } } },
    //                 { createdBy: id }
    //             ], 'status.label': search
    //         };
    //     } else {
    //         query = { boardId, 'status.label': search };
    //     }
    // } else if (type == 'documentType') {
    //     if (boardId == '') {
    //         query = {
    //             $or: [
    //                 { assignedTo: { $elemMatch: { id } } },
    //                 { cc: { $elemMatch: { id } } },
    //                 { createdBy: id }
    //             ], 'documentType.label': search
    //         };
    //     } else {
    //         query = { boardId, 'documentType.label': search }
    //     }
    // } else {
    //     if (boardId == '') {
    //         query = {
    //             $or: [
    //                 { assignedTo: { $elemMatch: { id } } },
    //                 { cc: { $elemMatch: { id } } },
    //                 { createdBy: id }
    //             ],
    //             $text: {
    //                 $search: `"${search}"`,
    //                 $caseSensitive: false,
    //                 $diacriticSensitive: false,
    //             },
    //         };
    //     } else {
    //         query = {
    //             boardId, $text: {
    //                 $search: `"${search}"`,
    //                 $caseSensitive: false,
    //                 $diacriticSensitive: false,
    //             },
    //         }
    //     }
    // }
}
const getAllItemsOfUser = async (req, res, next) => {
    const { _id } = req.user;
    Model.ItemModel.find({ boardId: bid, assignedTo: { $elemMatch: { id: _id } } })
        .populate('assignedTo.id', 'name email imageUrl companyName')
        .populate('cc.id', 'name email imageUrl companyName')
        .populate('activity.userId', 'name email imageUrl companyName')
        .populate('createdBy', 'name email imageUrl companyName').sort({ createdAt: -1 }).then(items => {
            res.status(200).send({ items });
        }).
        catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const deleteItem = async (req, res, next) => {
    const { id } = req.params;
    // send Notification
    const itemm = await Model.ItemModel.find({ _id: id });
    Model.ItemModel.findByIdAndRemove(id, async (err, result) => {
        if (result) {
            if (itemm.length > 0) {
                const boardd = await Model.BoardModel.find({ _id: itemm[0].boardId }).select('title members');
                if (boardd.length > 0) {
                    const data = {
                        by: req.user.name,
                        itemId: itemm[0]._id,
                        boardId: itemm[0].boardId,
                        text: `${req.user.name} deleted item ${itemm[0].title} in a board ${boardd[0].title}`,
                        type: 'item'
                    }
                    if (boardd[0].members.length > 0) {
                        sendNotification(data, boardd[0].members);
                    }
                }
            }
            res.status(200).send({
                message: 'Item Deleted Successfully.',
            });
        } else {
            res.status(500);
            next(new Error('Internal Server Error!'));
        }
    });
};

const addMultipleFiles = (req, res, next) => {
    console.log(req.files);
}

export default { addMultipleFiles, uploadDocument, testt, deleteDocument, addItem, updateItemUpdateType, searchItemsByFilter, updateItemDocument, getAllItemsOfBoard, getAllItemsOfUser, getAllItemsOfUserByBoard, getSingleItem, updateItem, deleteItem }