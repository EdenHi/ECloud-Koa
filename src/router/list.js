const Router = require("@koa/router");
const db = require("../utils/db");
const list = new Router();

list.get("/message", async (ctx) => {
  let sql = `select * from e_user`;
  ctx.body = await new Promise((resolve, reject) => {
    db.query(sql, (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
});

module.exports = list;
