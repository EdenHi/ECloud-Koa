const Router = require("@koa/router");
const router = new Router();
const user = require("./user");
const list = require("./list");
router.get("/", async (ctx) => {
  ctx.body = "home";
});
router.use("/user", user.routes(), user.allowedMethods());
router.use("/list", list.routes(), user.allowedMethods());

module.exports = router;
