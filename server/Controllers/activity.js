import Model from '../Models/Model';

const addActivity = async (data) => {
    const { text, userId } = data;
    const newActivity = new Model.ActivityModel({
        text, userId
    });
    newActivity.save()
        .then(activity => {
            console.log('');
        })
        .catch(err => {
            console.log(err);
        });
};

const getAllActivitiesOfUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const activities = await Model.ActivityModel.find({ userId: _id }).sort({ createdAt: -1 });
        res.status(200).send({ activities });
    } catch (err) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
}

export default { addActivity, getAllActivitiesOfUser };