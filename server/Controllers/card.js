import Model from '../Models/Model';

const addCard = async (req, res, next) => {
    try {
        const { title, columnId, cardId } = req.body;
        const newCard = new Model.CardModel({
            title,
            column: columnId,
            cardId,
        });
        const result = await newCard.save();
        const column = await Model.ColumnModel.findOne({ _id: columnId }).exec();
        if (!column) {
            res.status(404);
            next(new Error('Column of provided id doesnt exist!'));
        } else {
            const newCardIds = Array.from(column.cardIds);
            newCardIds.push(result.cardId);
            column.set({ cardIds: newCardIds });
            const result2 = await column.save();
            return res.status(201).send({
                message: 'new card is created and also cardIds in column is also updated',
                card: result,
                column: result2,
            });
        }
    } catch (e) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
};

const findAllCards = columnId =>
    Model.CardModel.find({ column: columnId }).select('cardId title');

const getAllCards = async (req, res, next) => {
    try {
        const { columnIds } = req.body;

        let totalCards = [];
        if (columnIds && columnIds.length > 0) {
            let i = 0;
            for (const columnId of columnIds) {
                const cards = await findAllCards(columnId);

                if (cards.length > 0) {
                    totalCards.push(cards);
                }
            }
            return res.status(200).send({ message: 'Success', cards: totalCards });
        }
    } catch (error) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
};

const getCardById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const card = await Model.CardModel.findOne({ _id: id }).exec();
        if (!card) {
            res.status(404);
            next(new Error('unable to find card of provided Id!'));
        } else {
            res
                .status(201)
                .send({ message: 'card content/title updated', data: card.title });
        }
    } catch (e) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
};

const reOrderCardsInSameColumn = async (req, res, next) => {
    try {
        const { sameColumnId, samecolumnCardIds } = req.body;
        console.log(sameColumnId, samecolumnCardIds);
        const column = await Model.ColumnModel.findOne({ columnId: sameColumnId });
        if (!column) {
            res.status(404);
            next(new Error('unable to find column of provided Id!'));
        } else {
            column.set({ cardIds: samecolumnCardIds });
            const savedColumn = await column.save();

            res
                .status(200)
                .send({ message: 'same column reorder success', savedColumn });
        }
    } catch (e) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
};

const reOrderCardsInDifferentColumn = async (req, res, next) => {
    try {
        const {
            removedColumnId,
            addedColumnId,
            removedColumnCardIds,
            addedColumnCardIds,
        } = req.body;

        const removedcolumn = await Model.ColumnModel.findOne({ columnId: removedColumnId });
        removedcolumn.set({ cardIds: removedColumnCardIds });
        await removedcolumn.save();

        const addedcolumn = await Model.ColumnModel.findOne({ columnId: addedColumnId });
        addedcolumn.set({ cardIds: addedColumnCardIds });
        await addedcolumn.save();

        return res
            .status(200)
            .send({ message: 'different column reorder success' });
    } catch (e) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
};

export default { addCard, getAllCards, getCardById, reOrderCardsInSameColumn, reOrderCardsInDifferentColumn }
