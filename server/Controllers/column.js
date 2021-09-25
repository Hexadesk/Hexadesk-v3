import Model from '../Models/Model';

const addColumn = async (req, res, next) => {
    try {
        const { title, boardId, columnId } = req.body;
        await Model.ColumnModel.find().exec();
        const newColumn = new Model.ColumnModel({
            boardId,
            title,
            cardIds: [],
            columnId,
        });
        const result = await newColumn.save();
        const board = await Model.BoardModel.findById(boardId).exec();
        if (!board) {
            res.status(404);
            next(new Error('No Board exists of provided id!'));
        } else {
            const newColumnOrder = Array.from(board.columnOrder);
            debugger;
            newColumnOrder.push(result.columnId);
            board.set({ columnOrder: newColumnOrder });
            const result2 = await board.save();
            res.status(201).send({
                message: 'New Column Added and also updated columnOrder in board',
                column: result,
                board: result2,
            });
        }
    } catch (e) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
    // .then(() => {
    //
    //
    //         .then(result => {
    //
    //                 .then(board => {
    //                     if (!board) {
    //                         return res
    //                             .status(404)
    //                             .json({message: 'No Board exists of provided id'});
    //                     }
    //                     const newColumnOrder = Array.from(board.columnOrder);
    //                     debugger;
    //                     newColumnOrder.push(result.columnId);
    //                     board.set({columnOrder: newColumnOrder});
    //                     board
    //                         .save()
    //                         .then(result2 =>
    //                             res.status(201).json({
    //                                 message:
    //                                     'New Column Added and also updated columnOrder in board',
    //                                 column: result,
    //                                 board: result2,
    //                             })
    //                         )
    //                         .catch(error => internalErrorResponse(error, res));
    //                 })
    //                 .catch(error => internalErrorResponse(error, res));
    //         })
    //         .catch(error => internalErrorResponse(error, res));
    // })
    // .catch(error => internalErrorResponse(error, res));
};


const updateColumnTitle = (req, res, next) => {
    const { id } = req.params;

    if (req.query.title) {
        Model.ColumnModel.findByIdAndUpdate(id, { title: req.query.title }, { new: true })
            .exec()
            .then(column => {
                if (!column) {
                    res.status(404);
                    next(new Error('unable to find the column of provided id!'));
                } else {
                    return res
                        .status(200)
                        .json({ message: 'column title updated ', data: column });
                }
            })
            .catch(error => {
                res.status(500);
                next(new Error('Internal Server Error!'));
            });
    } else {
        res.status(404);
        next(new Error('Title not found in the query!'));
    }
};

// route GET /api/columns/column/:columnId
// required: authToken
// desc get the column of provided id
// access private
const getSingleColumn = async (req, res) => {
    Model.ColumnModel.findOne({ _id: req.params.id })
        .exec()
        .then(column => {
            if (!column) {
                res.status(404);
                next(new Error('Column with given id not found!'));
            } else {
                return res.status(200).json({ message: 'Success', details: column });
            }
        })
        .catch(error => {
            res.status(404);
            next(new Error('Title not found in the query!'));
        });
};


const getColumnsByBoardId = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const board = await Model.BoardModel.findOne({ _id: boardId })
            .select('columnOrder')
            .exec();
        if (!board) {
            res.status(404);
            next(new Error('Board with given id was not found!'));
        } else {
            const columns = await Model.ColumnModel.find({ boardId })
                .select('cardIds title columnId _id')
                .exec();
            return res
                .status(200)
                .json({ message: 'success', columns: columns, board: board });
        }
    } catch (e) {
        res.status(500);
        next(new Error('Internal Server Error!!'));
    }
    //     //    Column.findOne({_id:req.params.boardId})
    //     //        .exec()
    //     //        .then(board=>{
    //     //            if(!board){

    //     //                return res.status(404).json({message:'unable to find board of provided id'});
    //     //            }
    //     //            if(board.columns.length===0){
    //     //                return res.status(200).json({message:'No column has been created in this board'})
    //     //            }
    //     //            return res.status(200).json({message:'Success', board});
    //     //        })
    //     //        .catch(error=>internalErrorResponse(error,res))
};

export default { addColumn, getSingleColumn, updateColumnTitle, getColumnsByBoardId }
