import express from 'express'
const router = express.Router()
import MaterialReceiptNote from '../../models/MaterialReceiptNote'
import MaterialReceiptNoteDet from '../../models/MaterialReceiptNoteDet'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'

router.get(
  '/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    MaterialReceiptNote.findById(params.id)
      .then(item => {
        res.json(item)
      })
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

    MaterialReceiptNote.find()
      .sort({ createddate: -1 }) //desc = -1 acs = 1
      .then(item => res.json(item)) //return lại item
      .catch(err => res.json(err)) //Catch lỗi rồi return ra;
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

    MaterialReceiptNote.find()
      .populate('idSupplier', 'name')
      .populate('idUser', 'fullName')
      .limit(Number(objects))
      .skip(objects * (page - 1))

      .then(el => res.json(el))
      .catch(err => res.json(err))
  }
)

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  MaterialReceiptNote.find()
    .countDocuments()
    .sort({ idSupplier: -1 })
    .then(counter => res.json(counter))
    .catch(err => res.json(err))
})

router.post(
  '/',
  role([Role.materialReceiptNoteManagement]),
  ({ body }, res) => {
    const { idSupplier, idUser, createddate, _id, dets } = body
    const newItem = new MaterialReceiptNote({
      idSupplier,
      idUser,
      createddate,
      _id
    })

    newItem
      .save()
      .then(item => {
        dets.map(element => {
          const newDet = new MaterialReceiptNoteDet({
            idMaterialReceiptNote: _id,
            idMaterial: element.idMaterial,
            quantity: element.quantity,
            price: element.price,
            _id: element.id
          })

          newDet
            .save()
            .then(item => res.json(item))
            .catch(err => res.json(err))
        })
      })
      .catch(err => res.json(err))
  }
)

router.delete(
  '/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    MaterialReceiptNote.findByIdAndDelete(params.id)
      .then(item => res.json(item))
      .catch(err => res.json(err))
  }
)

export default router
