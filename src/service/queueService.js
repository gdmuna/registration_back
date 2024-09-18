const queueDao = require('../dao/queueDao');

// 获取挂号人列表
exports.getqueueList = async (registrationId) => {
    const queueList = await queueDao.getqueueList(registrationId);
    return queueList;
};

//获取单个挂号r人详情信息
exports.getqueueDetail = async (number) => {
    const queueDetail = await queueDao.getqueueDetail(number);
    return queueDetail;
};

// 创建挂号人
exports.createqueue = async (isHad, name, number, registrationId, isOver, isBegin) => {
    if (isHad) {
        const queue = await queueDao.updatequeue(name, number, registrationId, isOver, isBegin);
        return queue;
    } else {
        const queue = await queueDao.createqueue(name, number, registrationId, isOver, isBegin);
        return queue;
    }
};

//删除挂号人
exports.deletequeue = async (number, registrationId) => {
    const result = await queueDao.deletequeue(number, registrationId);
    return result;
};
