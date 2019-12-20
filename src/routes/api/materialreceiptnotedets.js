import express from 'express'
const router = express.Router()
import MaterialReceiptNoteDet from '../../models/MaterialReceiptNoteDet'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'

router.get(
  '/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    MaterialReceiptNoteDet.findById(params.id)
      .then(item => {
        res.json(item)
      })
      .catch(err => res.json(err))
  }
)

router.get(
  '/findByReceipt/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    MaterialReceiptNoteDet.find({ idMaterialReceiptNote: params.id })
      .then(item => {
        res.json(item)
      })
      .catch(err => res.json(err))
  }
)

router.put(
  '/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ body, params }, res) => {
    const newItem = {
      idMaterialReceiptNote: body.idMaterialReceiptNote,
      idMaterial: body.idMaterial,
      quantity: body.quantity,
      price: body.price,
      _id: params.id
    }
    MaterialReceiptNoteDet.findByIdAndUpdate(params.id, newItem, { new: true })
      .then(item => {
        res.json(item)
      })
      .catch(err => res.json(err))
  }
)

router.get(
  '/:objects/:page/:query',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    const { objects, page, query } = params
    let newQuery = ''
    if (query === 'undefined') newQuery = ''
    else newQuery = query

    MaterialReceiptNoteDet.find({
      idMaterial: { $regex: newQuery, $options: 'i' }
    })
      .limit(Number(objects))
      .skip(objects * (page - 1))
      .sort({ idMaterial: -1 })
      .then(item => res.json(item))
      .catch(err => res.json(err))
  }
)

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  MaterialReceiptNoteDet.find({
    idMaterial: { $regex: newQuery, $options: 'i' }
  })
    .countDocuments()
    .sort({ idMaterial: -1 })
    .then(counter => res.json(counter))
    .catch(err => res.json(err))
})

router.post(
  '/',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ body }, res) => {
    const newItem = new MaterialReceiptNoteDet({
      idMaterialReceiptNote: body.idMaterialReceiptNote,
      idMaterial: body.idMaterial,
      quantity: body.quantity,
      price: body.price,
      _id: body.id
    })

    newItem
      .save()
      .then(item => res.json(item))
      .catch(err => res.json(err))
  }
)

router.delete(
  '/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    MaterialReceiptNoteDet.findByIdAndDelete(params.id)
      .then(item => res.json(item))
      .catch(err => res.json(err))
  }
)

router.get(
  '/getall/:query',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    const { query } = params
    let newQuery = ''
    if (query === 'undefined') newQuery = ''
    else newQuery = query

    MaterialReceiptNoteDet.find()
      .sort({ idMaterial: -1 }) //desc = -1 acs = 1
      .then(item => res.json(item)) //return lại item
      .catch(err => res.json(err)) //Catch lỗi rồi return ra;
  }
)

export default router
