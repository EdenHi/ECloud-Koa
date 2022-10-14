const Koa = require("koa2");
const app = new Koa();
const port = 3000;
const cors = require("koa2-cors");
const useStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error");
const path = require("path");
const koajwt = require("koa-jwt");
const router = require("./src/router/index");
//错误处理
app.use(error());
//允许跨域
app.use(cors());
//静态资源
app.use(useStatic(path.join(__dirname + "/src/assets")));
//post请求体解析
app.use(bodyParser());
//token验证
app.use(koajwt({ secret: "secret" }).unless({ path: [/^\/user/] }));
//启动路由
app.use(router.routes());
app.use(router.allowedMethods());
//启动服务
app.listen(port, () => {
  console.log(`Server is running at  http://localhost:${port}`);
});
