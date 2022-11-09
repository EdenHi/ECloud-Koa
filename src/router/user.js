const Router = require("@koa/router");
const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const user = new Router();
user.post("/login", async (ctx) => {
    const body = ctx.request.body;
    let sql = `select * from e_user where userName = '${body.userName}' and email = '${body.email}'`;
    const res = await new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
    if (res.length === 1) {
        const token = jwt.sign(
            {
                userName: res.userName,
                password: res.password,
            },
            "secret",
            {expiresIn: "24h"}
        );
        ctx.body = {
            refresh_token: token,
        };
    } else {
        ctx.throw(-1, "未找到该用户，请注册");
    }
});
user.post("/register", async (ctx) => {
    const body = ctx.request.body;
    let sql = `select * from e_user where userName = '${body.userName}' and email = '${body.email}'`;
    const resSearch = await new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
    if (resSearch.length === 0) {
        sql = `insert into e_user (userName,userRole,password,email) values('${body.userName}',${body.userRole},'${body.password}','${body.email}')`;
        const resResult = await new Promise((resolve, reject) => {
            db.query(sql, (err, data) => {
                if (err) throw err;
                resolve(data);
            });
        });
        if (!resResult.fieldCount) {
            const token = jwt.sign(
                {
                    userName: body.userName,
                    password: body.password,
                },
                "secret",
                {expiresIn: "24h"}
            );
            ctx.body = {
                refresh_token: token,
                msg: '注册成功'
            };
        } else {
            ctx.throw(-1, "注册失败")
        }

    } else {
        ctx.throw(-1, "该用户已存在");
    }
});
module.exports = user;
