const router = require('express').Router();
module.exports = router;

const registrationService = require('../service/registrationService');

//获取挂号体列表
router.get('/list', async (req, res, next) => {
    const { userId } = req.payload;
    const registrationList = await registrationService.getRegistrationList(userId);
    res.ResultVO(0, '获取挂号体列表成功', registrationList);
});

//获取单个挂号体详情信息
router.get('/detail', async (req, res, next) => {
    const { registrationId } = req.query;
    const registrationDetail = await registrationService.getRegistrationDetail(registrationId);
    res.ResultVO(0, '获取挂号体详情成功', registrationDetail);
});

//创建挂号体
router.post('/create', async (req, res, next) => {
    const { registrationId, name, beginTime, endTime, isBegin, isEnd } = req.body;
    const { userId } = req.payload;
    const result = await registrationService.createRegistration(registrationId, name, beginTime, endTime, isBegin, isEnd, userId);
    res.ResultVO(0, '创建挂号体成功', result);
});

//删除挂号体
router.delete('/delete', async (req, res, next) => {
    const { registrationId } = req.body;
    const result = await registrationService.deleteRegistration(registrationId);
    res.ResultVO(0, '删除挂号体成功', result);
});
