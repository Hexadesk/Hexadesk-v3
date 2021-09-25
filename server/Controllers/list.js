import Model from '../Models/Model';

const addList = async (req, res, next) => {
    const { title, boardId } = req.body;
    // let filesArray = [];
    // if (req.files !== undefined && req.files.length > 0) {
    // const urls = await Promise.all(uploadMutipleFiles(req.files));
    // filesArray = urls;
    // }
    const newList = new Model.ListModel({
        title, boardId
    });
    newList.save()
        .then(savedList => {
            res.status(201).send({ savedList });
        })
        .catch(err => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const updateList = async (req, res, next) => {
    const { id } = req.params;
    const query = { $set: req.body };
    Model.ListModel.findByIdAndUpdate(
        id,
        query,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) {
                res.status(500);
                next(new Error(`Internal Server Error!`));
            } else {
                res.status(200).send({ list: doc });
            }
        }
    );
}

const getAllListsOfBoard = async (req, res, next) => {
    const { bid } = req.params;
    Model.ListModel.find({ boardId: bid }).then(list => {
        res.status(200).send({ list });
    }).
        catch(error => {
            res.status(500);
            next(new Error('Internal Server Error!'));
        });
};

const deleteList = (req, res, next) => {
    const { id } = req.params;
    Model.ListModel.findByIdAndRemove(id, (err, result) => {
        if (result) {
            res.status(200).send({
                message: 'List Deleted Successfully.',
            });
        } else {
            res.status(500);
            next(new Error('Internal Server Error!'));
        }
    });
};

export default { addList, deleteList, getAllListsOfBoard, updateList };