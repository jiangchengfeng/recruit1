import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/edu', { useNewUrlParser: true })

const advertSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  create: { type: Date, defalut: Date.now },
  last: { type: Date, defalut: Date.now },
})

const Advert = mongoose.model('Advert', advertSchema)
export default Advert


// pageSize 3
// 1 0 3
// 2 3 3
// 3 6 3
// n 3*(n-1) 3

// Advert
//   .find()
//   .skip(1)
//   .limit(1)
//   .exec((err, data) => {
//     if (err) {
//       throw err
//     }
//     console.log(data);
//   })