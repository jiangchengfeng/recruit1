## 分页
- pageSize 3
- 1 0 3
- 2 3 3
- 3 6 3
- n 3*(n-1) 3

```
Advert
  .find()
  .skip(1)
  .limit(1)
  .exec((err, data) => {
  if (err) {
  throw err
  }
  console.log(data);
})
```