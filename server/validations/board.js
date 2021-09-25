const addBoard = (req, res, next) => {
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400);
        next(
            new Error('title and description Must be Defined in request body'),
        );
    } else {
        next();
    }
};


const clickOnInvite = (req, res, next) => {
    const { boardId, email } = req.body;

    if (!boardId || !email) {
        res.status(400);
        next(
            new Error('boardId and email Must be Defined in request body'),
        );
    } else {
        next();
    }
};

const responseToInvite = (req, res, next) => {
    const { boardId, email, status } = req.body;

    if (!boardId || !email || !status) {
        res.status(400);
        next(
            new Error('boardId, status and email Must be Defined in request body'),
        );
    } else {
        next();
    }
};

export default { addBoard, clickOnInvite, responseToInvite };