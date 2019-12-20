import express from 'express'
import auth from '../../middleware/auth'
const router = express.Router()

//StorageReport Model
import StorageReport from '../../models/StorageReport'

//search theo query, them duong dan /api/storagereport/search/ trong file server
router.get('/search/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  StorageReport.find({ idMaterial: { $regex: newQuery, $options: 'i' } })
    .sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(storagereport => res.json(storagereport)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/:id', auth, ({ params }, res) => {
  StorageReport.findById(params.id)
    .then(storagereport => {
      res.json(storagereport)
    }) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/', auth, (req, res) => {
  StorageReport.find()
    .then(storagereport => {
      res.json(storagereport)
    }) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.put('/:id', auth, ({ body, params }, res) => {
  const { idUser, idMaterial, quantity, createddate } = body
  const newStorageReport = {
    idUser,
    idMaterial,
    quantity,
    createddate,
    _id: params.id
  }
  StorageReport.findByIdAndUpdate(params.id, newStorageReport, { new: true })
    .then(storagereport => {
      res.json(storagereport)
    }) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/:objects/:page/:query', auth, ({ params }, res) => {
  const { objects, page, query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  StorageReport.find({ idMaterial: { $regex: newQuery, $options: 'i' } })
    .limit(Number(objects))
    .skip(objects * (page - 1))
    .sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(storagereport => res.json(storagereport)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  StorageReport.find({ idMaterial: { $regex: newQuery, $options: 'i' } })
    .countDocuments()
    .sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(counter => res.json(counter)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

//@route POST /storagereport   (dùng phương thức POST và route là /storagereport)
//@desc  Create a storagereport  (miểu tả APi làm gì)
//@access Public            (access hiện tại là public vì Trung chưa tạo authentication)
router.post('/', auth, ({ body }, res) => {
  const { idUser, idMaterial, quantity, createddate, _id } = body
  const newStorageReport = new StorageReport({
    idUser,
    idMaterial,
    quantity,
    createddate,
    _id
  })

  newStorageReport
    .save()
    .then(storagereport => res.json(storagereport)) //reutnr lại item đã save đc
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.delete('/:id', auth, ({ params }, res) => {
  StorageReport.findByIdAndDelete(params.id)
    .then(item => res.json(item)) //Return lại item đã xóa
    .catch(err => res.json(err)) //Catch lỗi rồi return ra
})

export default router
