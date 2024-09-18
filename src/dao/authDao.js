// dao/authDao.js
const db = require('../utils/dbConnPool/mariadb');

// 用户登录
exports.login = async (account) => {
    const sql = `
        SELECT
            id AS userId,
            account,
            password AS passwordHash
        FROM
            userinfo
        WHERE
            account = ?
    `;
    const sqlParams = [account];
    return await db.query(sql, sqlParams);
};

// 用户注册
exports.register = async (account, passwordHash, userId) => {
    const sql = `
        INSERT INTO userinfo (account, password, id, nickname)
        VALUES (?, ?, ?, '用户')
    `;
    const sqlParams = [account, passwordHash, userId];
    await db.query(sql, sqlParams);
};

//查询account是否存在
exports.queryAccount = async (account) => {
    const sql = `
        SELECT
            account
        FROM
            userinfo
        WHERE
            account = ?
    `;
    const sqlParams = [account];
    return await db.query(sql, sqlParams);
};
