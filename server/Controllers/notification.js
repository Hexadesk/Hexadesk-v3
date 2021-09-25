import Model from '../Models/Model';

const addNotification = async (data) => {
    const { email, text, type, boardId, itemId, prevVersionId, by } = data;
    const newNoti = new Model.NotificationModel({
        email, text, type, boardId, itemId, prevVersionId, by
    });
    newNoti.save()
        .then(notification => {
            console.log('');
        })
        .catch(err => {
            console.log(err);
        });
};

const getAllNotificationsOfUser = async (req, res, next) => {
    try {
        const { email } = req.user;
        const readCount = await Model.NotificationModel.find({ email, readStatus: true }).countDocuments();
        const readNotifications = await Model.NotificationModel.find({ email, readStatus: true }).sort({ createdAt: -1 }).limit(10);
        const unreadNotifications = await Model.NotificationModel.find({ email, readStatus: false }).sort({ createdAt: -1 });
        res.status(200).send({ read: readNotifications, unread: unreadNotifications, unreadCount: unreadNotifications.length, readCount });
    } catch (err) {
        res.status(500);
        next(new Error('Internal Server Error!'));
    }
}

const updateNotificationStatus = (req, res, next) => {
    const { email } = req.user;
    Model.NotificationModel.updateMany(
        { email },
        { $set: { "readStatus": true } },
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
}

export default { addNotification, getAllNotificationsOfUser, updateNotificationStatus };