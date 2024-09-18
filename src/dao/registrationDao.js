const db = require('../utils/dbConnPool/mariadb');

// 引入 UUIDv7 生成器
const { v7: uuidv7 } = require('uuid');

// 获取挂号体列表
exports.getRegistrationList = async (userId) => {
    const sql = `
        SELECT
            id AS registrationId,
            name,
            is_begin AS isBegin,
            is_end AS isEnd,
            begin_time AS beginTime,
            end_time AS endTime
        FROM
            registration
        WHERE
            created_by = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

//获取单个挂号体详情信息
exports.getRegistrationDetail = async (registrationId) => {
    const sql = `
        SELECT
            id AS registrationId,
            name,
            is_begin AS isBegin,
            is_end AS isEnd,
            begin_time AS beginTime,
            end_time AS endTime
        FROM
            registration
        WHERE
            id = ?
    `;
    const sqlParams = [registrationId];
    return await db.query(sql, sqlParams);
};

// 创建二维码
exports.createRegistration = async (name, beginTime, endTime, isBegin, isEnd, userId) => {
    const sql = `
        INSERT INTO
            registration (id, name, begin_time, end_time, is_begin, is_end, created_by)
        VALUES
            (?, ?, ?, ?, ?, ?, ?)
    `;
    const sqlParams = [uuidv7(), name, beginTime, endTime, isBegin, isEnd, userId];
    return await db.query(sql, sqlParams);
};

// 更新挂号体
exports.updateRegistration = async (registrationId, name, beginTime, endTime, isBegin, isEnd) => {
    const sql = `
        UPDATE
            registration
        SET
            name = ?,
            begin_time = ?,
            end_time = ?,
            is_begin = ?,
            is_end = ?
        WHERE
            id = ?
    `;
    const sqlParams = [name, beginTime, endTime, isBegin, isEnd, registrationId];
    return await db.query(sql, sqlParams);
};

// // 更新二维码
// exports.updateQRCode = async (qrcodeId, name, description, url) => {
//     const sql = `
//         UPDATE
//             qrcode
//         SET
//             name = ?,
//             description = ?,
//             url = ?,
//             update_time = NOW()
//         WHERE
//             id = ?
//     `;
//     const sqlParams = [name, description, url, qrcodeId];
//     return await db.query(sql, sqlParams);
// };

//删除挂号体
exports.deleteRegistration = async (registrationId) => {
    const sql = `
        DELETE FROM
            registration
        WHERE
            id = ?
    `;
    const sqlParams = [registrationId];
    return await db.query(sql, sqlParams);
};
