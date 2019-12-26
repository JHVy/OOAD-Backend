import express from 'express'
const router = express.Router()

import Payslip from '../../models/PaySlip'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'

router.get('/:id', auth, role([Role.payslipManagement]), ({ params }, res) => {
  Payslip.findById(params.id)
    .populate('idUser', 'fullName')

    .populate('idSupplier', 'name')
    .then(payslip => {
      res.json(payslip)
    })
    .catch(err => res.json(err))
})

router.get('/', auth, role([Role.payslipManagement]), (req, res) => {
  Payslip.find()
    .then(payslip => {
      res.json(payslip)
    })
    .catch(err => res.json(err))
})

router.put(
  '/:id',
  auth,
  role([Role.payslipManagement]),
  ({ body, params }, res) => {
    const { idUser, idSupplier, createddate, comment, totalAmt } = body
    const newPaySlip = {
      idUser,
      idSupplier,
      comment,
      createddate,
      totalAmt,
      _id: params.id
    }
    Payslip.findByIdAndUpdate(params.id, newPaySlip, { new: true })
      .then(payslip => {
        res.json(payslip)
      })
      .catch(err => res.json(err))
  }
)

router.get(
  '/:objects/:page/:query',
  auth,
  role([Role.payslipManagement]),
  ({ params }, res) => {
    const { objects, page, query } = params
    let newQuery = ''
    if (query === 'undefined') newQuery = ''
    else newQuery = query

    Payslip
      .find
      // { idUser: { $regex: newQuery, $options: 'i' }, }
      ()
      .limit(Number(objects))
      .populate('idUser', 'fullName')

      .populate('idSupplier', 'name')
      .skip(objects * (page - 1))
      //.sort({ createddate: -1 })
      .then(payslip => res.json(payslip))
      .catch(err => res.json(err))
  }
)

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  Payslip.find()
    .countDocuments()
    .sort({ createddate: -1 })
    .then(counter => res.json(counter))
    .catch(err => res.json(err))
})

router.post('/', auth, role([Role.payslipManagement]), ({ body }, res) => {
  const { idUser, idSupplier, createddate, comment, totalAmt, _id } = body
  const newPaySlip = new Payslip({
    _id,
    idUser,
    idSupplier,
    createddate,
    comment,
    totalAmt
  })

  newPaySlip
    .save()
    .then(payslip => res.json(payslip))
    .catch(err => res.json(err))
})

router.delete(
  '/:id',
  auth,
  role([Role.payslipManagement]),
  ({ params }, res) => {
    Payslip.findByIdAndDelete(params.id)
      .then(payslip => res.json(payslip))
      .catch(err => res.json(err))
  }
)

export default router
