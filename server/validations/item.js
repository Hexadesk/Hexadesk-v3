const addItem = (req, res, next) => {
    const { title, boardId, dueDate, startDate, status } = req.body;

    if (!title || !boardId || !dueDate || !startDate || !status) {
        res.status(400);
        next(
            new Error('title,  boardId, dueDate, startDate and status Must be Defined in request body'),
        );
    } else {
        next();
    }
};

export default { addItem };