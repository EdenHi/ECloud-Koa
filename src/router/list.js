const Router = require("@koa/router");
const db = require("../utils/db");
const list = new Router();

list.get("/message", async (ctx) => {
    let sql = `select * from e_user`;
    const res = await new Promise((resolve, reject) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data);
        });
    });
    ctx.body = {
        list: res
    }
});

module.exports = list;
