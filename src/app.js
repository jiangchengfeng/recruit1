import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import bodyParser from './middlewares/body-parser'
import errLog from './middlewares/err-log'

import indexRouter from './routes/index'
import advertRouter from './routes/advert'

const app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

// 配置使用nunjucks 模板引擎
nunjucks.configure(config.view_path, {
  autoescape: true,
  express: app,
  noCache:true
})

// 挂载解析表单POST请求中间件
app.use(bodyParser)

app.use(indexRouter)
app.use(advertRouter)

app.use(errLog)

app.listen(3000, () => {
  console.log('server is running at port 3000...')
})