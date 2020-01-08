import express from 'express'
import config from '../config'
import Advert from '../models/advert'
import Formidable from 'formidable'
import { basename } from 'path'

const router = express.Router()

router.get('/advert/count', (req, res, next) => {
  Advert.count((err, count) => {
    if (err) {
      return next(err)
    }
    res.json({
      err_code: 0,
      result: count
    })
  })
})

router.get('/advert', (req, res, next) => {
  res.render('advert_list.html')

  // const page = Number.parseInt(req.query.page, 10)
  // const pageSize = 5

  // Advert
  //   .find()
  //   .skip((page - 1) * pageSize)
  //   .limit(pageSize)
  //   .exec((err, adverts) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     Advert.count((err, count) => {
  //       if (err) {
  //         return next(err)
  //       }
  //       const totalPage = Math.ceil(count / pageSize) //总页码
  //       res.render('advert_list.html', { adverts,totalPage,page })
  //     })
  //   })
})

router.get('/advert/add', (req, res, next) => {
  res.render('advert_add.html')
})

router.post('/advert/add', (req, res, next) => {
  // 1.接收表单提交的数据
  // const body = req.body
  // console.log('收到了');
  const form = new Formidable();
  form.uploadDir = config.uploadDir // 配置formidable 文件上传接收路径
  form.keepExtensions = true; // 配置保存文件原始的扩展名
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    const body = fields
    // console.log(body);
    body.image = basename(files.image.path)
    // console.log(body.image);

    // 2.操作数据库
    const advert = new Advert({
      title: body.title,
      image: body.image,
      link: body.link,
      start: body.start,
      end: body.end,
    })

    advert.save((err, result) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0
      })
    })
  })
})


router.get('/advert/list', (req, res, next) => {
  let { page, pageSize } = req.query
  page = Number.parseInt(page)
  pageSize = Number.parseInt(pageSize)
  Advert
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec((err, adverts) => {
      if (err) {
        return next(err)
      }
      res.json({
        err_code: 0,
        result: adverts
      })
    })
})

router.get('/advert/one/:advertId', (req, res) => {
  // res.end(`路径参数ID为:${req.params.advertId}`)
  Advert.findById(req.params.advertId, (err, result) => {
    if (err) {
      return next(err)
    }
    // res.json({
    //   err_code: 0,
    //   result: result
    // })
    // console.log(result);
    res.render('advert_edit.html', {
      result: result
    })

  })

})

router.post('/advert/edit', (req, res, next) => {
  const form = new Formidable();
  form.uploadDir = config.uploadDir // 配置formidable 文件上传接收路径
  form.keepExtensions = true; // 配置保存文件原始的扩展名
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    const body = fields
    body.image = basename(files.image.path)
    Advert.findById(body.id, (err, advert) => {
      if (err) {
        return next(err)
      }
      advert.title = body.title
      advert.image = body.image
      advert.link = body.link
      advert.start = body.start
      advert.end = body.end
      advert.last = Date.now()
      advert.save((err, result) => {
        if (err) {
          return next(err)
        }
        res.json({
          err_code: 0,
        })
      })
    })
  })
})

router.get('/advert/remove/:advertId', (req, res, next) => {
  Advert.remove({ _id: req.params.advertId }, err => {
    if (err) {
      return next(err)
    }
    // res.json({
    //   err_code: 0
    // })
    // res.render('advert_list.html')
    res.redirect('/advert')
  })
})

export default router