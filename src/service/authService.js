// service/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v7: uuidv7 } = require('uuid'); // 导入 UUIDv7 生成器
const jwt_conf = require('config').get('jwtConfig');
const authDao = require('../dao/authDao');

// 用户登录
exports.login = async (account, password) => {
    try {
        const user = await authDao.login(account);
        if (!user || user.length === 0 || !user[0].passwordHash) {
            throw new Error('User not found or invalid data');
        }

        const match = await bcrypt.compare(password, user[0].passwordHash);
        if (!match) {
            throw new Error('Password mismatch');
        }

        const token = await jwt.sign(
            {
                userId: user[0].userId,
                userAccount: user[0].account
            },
            jwt_conf.secret,
            {
                expiresIn: jwt_conf.expiresIn
            }
        );

        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Authentication failed');
    }
};

// 用户注册
exports.register = async (account, password) => {
    //查询是否存在该账号
    const queryResult = await authDao.queryAccount(account);
    if (queryResult.length > 0) {
        return { code: 1, message: '账号已存在', data: 'HAD' };
    }
    try {
        // Generate UUIDv7
        const userId = uuidv7();

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Save to database
        await authDao.register(account, passwordHash, userId);

        return { code: 0, message: '注册成功', data: true };
    } catch (error) {
        console.error('Registration error:', error);
        throw new Error('注册失败');
    }
};

// 凭证校验
exports.tokenVerify = async (token) => {
    try {
        return await jwt.verify(token, jwt_conf.secret);
    } catch (err) {
        console.error('Token verification error:', err);
        return null;
    }
};
