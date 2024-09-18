const registrationDao = require('../dao/registrationDao');

// 获取二维码列表
exports.getRegistrationList = async (userId) => {
    const registrationList = await registrationDao.getRegistrationList(userId);
    //将里面的beginTime和endTime时间戳转换为正常时间
    registrationList.forEach((item) => {
        item.beginTime = new Date(item.beginTime).toISOString().slice(0, 19).replace('T', ' ');
        item.endTime = new Date(item.endTime).toISOString().slice(0, 19).replace('T', ' ');
    });
    return registrationList;
};

//获取单个挂号体详情信息
exports.getRegistrationDetail = async (registrationId) => {
    const registrationDetail = await registrationDao.getRegistrationDetail(registrationId);
    console.log(registrationDetail);
    registrationDetail.forEach((item) => {
        item.beginTime = new Date(item.beginTime).toISOString().slice(0, 19).replace('T', ' ');
        item.endTime = new Date(item.endTime).toISOString().slice(0, 19).replace('T', ' ');
    });
    return registrationDetail;
};

// 创建挂号体
exports.createRegistration = async (registrationId, name, beginTime, endTime, isBegin, isEnd, userId) => {
    if (registrationId == null) {
        const result = await registrationDao.createRegistration(name, beginTime, endTime, isBegin, isEnd, userId);
        return result;
    } else {
        const result = await registrationDao.updateRegistration(registrationId, name, beginTime, endTime, isBegin, isEnd);
        return result;
    }
};

// // 更新二维码
// exports.updateQRCode = async (qrcodeId, name, description, url) => {
//     const result = await qrcodeDao.updateQRCode(qrcodeId, name, description, url);
//     return result;
// };

//删除挂号体
exports.deleteRegistration = async (registrationId) => {
    const result = await registrationDao.deleteRegistration(registrationId);
    return result;
};
