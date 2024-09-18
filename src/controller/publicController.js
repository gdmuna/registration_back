const router = require('express').Router();
module.exports = router;

const publicService = require('../service/publicService');
const queueService = require('../service/queueService');
const registrationService = require('../service/registrationService');

//创建挂号人
router.post('/create', async (req, res, next) => {
    const { isHad, name, number, registrationId, isOver, isBegin } = req.body;
    const result = await queueService.createqueue(isHad, name, number, registrationId, isOver, isBegin);
    res.ResultVO(0, '创建挂号人成功', result);
});

//获取挂号人列表
router.get('/list', async (req, res, next) => {
    const { registrationId } = req.query;
    const queueList = await queueService.getqueueList(registrationId);
    res.ResultVO(0, '获取挂号人列表成功', queueList);
});
//获取单个挂号体详情信息
router.get('/detail', async (req, res, next) => {
    const { registrationId } = req.query;
    const registrationDetail = await registrationService.getRegistrationDetail(registrationId);
    res.ResultVO(0, '获取挂号体详情成功', registrationDetail);
});
