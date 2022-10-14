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
      { expiresIn: "1h" }
    );
    ctx.body = {
      refresh_token: token,
    };
  } else {
    ctx.throw(-1, "未找到该用户，请注册");
  }
});

module.exports = user;
