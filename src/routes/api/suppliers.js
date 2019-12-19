const express = require('express')
const router = express.Router()

import Supplier from '../../models/Supplier'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'

router.get(
  '/search/:query',
  auth,
  role([Role.supplierManagement]),

  ({ params }, res) => {
    const { query } = params

    if (query === 'undefined') newQuery = ''
    else newQuery = query

    Member.find({ name: { $regex: newQuery, $options: 'i' } })
      .sort({ createAt: -1 })
      .then(supplier => res.json(supplier))
      .catch(err => res.json(err))
  }
)

router.get('/:id', auth, role([Role.supplierManagement]), ({ params }, res) => {
  Supplier.findById(params.id)
    .then(supplier => {
      res.json(supplier)
    })
    .catch(err => res.json(err))
})

router.get('', auth, role([Role.supplierManagement]), (req, res) => {
  Supplier.find()
    .then(supplier => {
      res.json(supplier)
    }) // resturn lại item
    .catch(err => res.json(err)) // catch lỗi rồi return ra
})

router.put(
  '/:id',
  auth,
  role([Role.supplierManagement]),

  ({ body, params }, res) => {
    const newSupplier = {
      name: body.name,
      _id: params.id,
      phone: body.phone,
      address: body.address
    }
    Supplier.findByIdAndUpdate(params.id, newSupplier, { new: true })
      .then(supplier => {
        res.json(supplier)
      })
      .catch(err => res.json(err))
  }
)

router.get(
  '/:objects/:page/:query',
  auth,
  role([Role.supplierManagement]),

  ({ params }, res) => {
    const { objects, page, query } = params
    let newQuery = ''
    if (query === 'undefined') newQuery = ''
    else newQuery = query

    Supplier.find({ name: { $regex: newQuery, $options: 'i' } })
      .limit(Number(objects))
      .skip(objects * (page - 1))
      .sort({ createAt: -1 })
      .then(supplier => res.json(supplier))
      .catch(err => res.json(err))
  }
)

router.get('/count/:query', (req, res) => {
  const { query } = req.params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  Supplier.find({ name: { $regex: newQuery, $options: 'i' } })
    .countDocuments()
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(counter => res.json(counter)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.post('/', auth, role([Role.supplierManagement]), ({ body }, res) => {
  const newSupplier = new Supplier({
    name: body.name,
    phone: body.phone,
    address: body.address,
    _id: body._id
  })

  newSupplier
    .save()
    .then(supplier => res.json(supplier)) //reutnr lại item đã save đc
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.delete(
  '/:id',
  auth,
  role([Role.supplierManagement]),
  ({ params }, res) => {
    Supplier.findByIdAndDelete(params.id)
      .then(item => res.json(item))
      .catch(err => res.json(err))
  }
)

module.exports = router
