const db = require('../utils/dbConnPool/mariadb');

// 引入 UUIDv7 生成器
const { v7: uuidv7 } = require('uuid');

// 获取挂号人列表
exports.getqueueList = async (registrationId) => {
    //根据id排序
    const sql = `
        SELECT
            id,
            name,
            number,
            registration_id AS registrationId,
            is_over AS isOver,
            is_begin AS isBegin
        FROM
            queue
        WHERE
            registration_id = ?
        ORDER BY
            id
    `;
    const sqlParams = [registrationId];
    return await db.query(sql, sqlParams);
};

//获取单个挂号人详情信息
exports.getqueueDetail = async (number) => {
    const sql = `
        SELECT
            id,
            name,
            number,
            registration_id AS registrationId,
            is_over AS isOver,
            is_begin AS isBegin
        FROM
            queue
        WHERE
            number = ?
    `;
    const sqlParams = [number];
    return await db.query(sql, sqlParams);
};

// 创建挂号人
exports.createqueue = async (name, number, registrationId, isOver, isBegin) => {
    const sql = `
        INSERT INTO
            queue (name, number, registration_id, is_over, is_begin)
        VALUES
            (?, ?, ?, ?, ?)
    `;
    const sqlParams = [name, number, registrationId, isOver, isBegin];
    return await db.query(sql, sqlParams);
};

//根据number与regietrationId更新挂号人
exports.updatequeue = async (name, number, registrationId, isOver, isBegin) => {
    const sql = `
        UPDATE
            queue
        SET
            name = ?,
            is_over = ?,
            is_begin = ?
        WHERE
            registration_id = ? AND
            number = ?
    `;
    const sqlParams = [name, isOver, isBegin, registrationId, number];
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
exports.deletequeue = async (number, registrationId) => {
    const sql = `
        DELETE FROM
            queue
        WHERE
            number = ? AND
            registration_id = ?
    `;
    const sqlParams = [number, registrationId];
    return await db.query(sql, sqlParams);
};
