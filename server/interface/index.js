const Koa = require('koa')
const http = require('http')
const WebSocket = require('ws')
const cors = require('koa2-cors')
const router = require('koa-router')()
const DB = require('../mysql/sqlConfig')


// 创建一个Koa对象
const app = new Koa()
const server = http.createServer(app.callback())
const wss = new WebSocket.Server({ server })    // 同一端口监听不同的服务

wss.on('connection', function connection(ws) {
  ws.on('message', async function incoming(message) {
    // 消息id
    let messageIndex = 0
    const result = await DB.query(findExcerptSql)
    wss.clients.forEach((client) => {
      messageIndex++
      client.send(JSON.stringify(result))
    })
  })
})
// 处理跨域
app.use(cors())
app.use(router.routes())


// 网易热评的接口----------------------------------------------------------------
const findSql = "select * from hot"
// 数据库查询10条（0，10）
// limit m(跳过m条),n（取n条记录）
// 倒序拿到10条数据
const pageFindSql = "select * from hot order by id desc limit ?,?"


// 查
router.get('/find', async (ctx, next) => {
  ctx.body = await DB.query(findSql)
})

// 分页查询
router.get('/pageQuery', async (ctx, next) => {
  const {limit, page} = ctx.request.query
  /* 
    第一页：0，10（0，10）
    第二页：10，20（10，10）
  */
  // limit后面都是数字类型，转换一下 
  const pageFindSqlParams = [limit * (page - 1), +limit]
  // console.log(pageFindSqlParams);
  let total = await DB.query(findSql)
  let list = await DB.query(pageFindSql, pageFindSqlParams)
  // 解决不换行：replace全局替换和v-html
  // list.forEach(e => {
  //   e.content = e.content.replace(/\n/g, "<br/>")
  // })
  ctx.body = {total: total.length, list}
})


// #region
// 书摘(首页)的接口----------------------------------------------------------------
const findExcerptSql = "select * from excerpt"
const addExcerptSql = "insert into excerpt(content, author, flag) values(?,?,?)"
const updateExcerptSql = "update excerpt set content = ? where id = ?"
const delExcerptSql = "delete from excerpt where id = ?"

router.get('/findExcerpt', async (ctx, next) => {
  ctx.body = await DB.query(findExcerptSql)
})

router.get('/addExcerpt', async (ctx, next) => {
  const {content, author, flag} = JSON.parse(ctx.request.query.params)
  const addExcerptSqlParams = [content, author, flag]
  ctx.body = await DB.query(addExcerptSql, addExcerptSqlParams)
})

router.get('/updateExcerpt', async (ctx, next) => {
  const { id, content } = ctx.request.query
  const updateExcerptSqlParams = [content, id]
  await DB.query(updateExcerptSql, updateExcerptSqlParams)
  ctx.body = await DB.query(findExcerptSql)
})
router.get('/delExcerpt', async (ctx, next) => {
  await DB.query(delExcerptSql, ctx.request.query.id)
  ctx.body = await DB.query(findExcerptSql)
})
// #endregion


// 图片后台管理的接口----------------------------------------------------------------
const findPicTotalSql = "select * from picture"
const findPicSql = "select * from picture order by id desc limit ?,?"

// 查
router.get('/findPicTotal', async (ctx, next) => {
  ctx.body = await DB.query(findPicTotalSql)
})

// 分页查询
router.get('/picQuery', async (ctx, next) => {
  const {limit, page} = ctx.request.query
  /* 
    第一页：0，10（0，10）
    第二页：10，20（10，10）
  */
  // limit后面都是数字类型，转换一下 
  const pageFindSqlParams = [limit * (page - 1), +limit]
  // console.log(pageFindSqlParams);
  let total = await DB.query(findPicTotalSql)
  let list = await DB.query(findPicSql, pageFindSqlParams)
  // 解决不换行：replace全局替换和v-html
  // list.forEach(e => {
  //   e.content = e.content.replace(/\n/g, "<br/>")
  // })
  ctx.body = {total: total.length, list}
  // console.log(ctx.body);
})

// 上架下架
const updatePicSql = "update picture set putaway = ? where id = ?"
router.get('/updatePic', async (ctx, next) => {
  const { id, putaway } = ctx.request.query
  const updatePicSqlParams = [putaway, id]
  await DB.query(updatePicSql, updatePicSqlParams)
  ctx.body = {
    code: 200
  }
})


server.listen(3450)
// console.log(`服务器地址:${process.env.VUE_APP_BASE_API}/findExcerpt`);
console.log('服务器地址:http://localhost:3450/picQuery');