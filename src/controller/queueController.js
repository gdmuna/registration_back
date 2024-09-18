const router = require('express').Router();
module.exports = router;

const queueService = require('../service/queueService');

//获取挂号人列表
router.get('/list', async (req, res, next) => {
    const { registrationId } = req.query;
    const queueList = await queueService.getqueueList(registrationId);
    res.ResultVO(0, '获取挂号人列表成功', queueList);
});

//获取单个挂号人详情信息
router.get('/detail', async (req, res, next) => {
    const { number } = req.boby;
    const queueDetail = await queueService.getqueueDetail(number);
    res.ResultVO(0, '获取挂号人详情成功', queueDetail);
});

//创建挂号人
router.post('/create', async (req, res, next) => {
    const { isHad, name, number, registrationId, isOver, isBegin } = req.body;
    const result = await queueService.createqueue(isHad, name, number, registrationId, isOver, isBegin);
    res.ResultVO(0, '创建挂号人成功', result);
});

//删除挂号人
router.delete('/delete', async (req, res, next) => {
    const { number, registrationId } = req.body;
    const result = await queueService.deletequeue(number, registrationId);
    res.ResultVO(0, '删除挂号人成功', result);
});
