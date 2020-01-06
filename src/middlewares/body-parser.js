import queryString from 'querystring'

export default (req, res, next) => {
  if (req.method.toLowerCase() === 'get') {
    // console.log('进入body-parser了');
    return next()
  }
  // console.log(req.headers);
  if (req.headers['content-type'].startsWith('multipart/form-data')) {
    return next()
  }
  let data = ''
  req.on('data', chunk => {
    data += chunk
  })
  req.on('end', () => {
    // 手动给req对象挂载一个body属性 至九十当前表单POST请求体对象
    // 在后续的处理中间件中 就可以直接使用req.body了
    req.body = queryString.parse(data)
    next()
  })

}