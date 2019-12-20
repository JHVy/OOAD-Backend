import express from 'express'
const router = express.Router()
import InvoiceDet from '../../models/InvoiceDet'

router.get('/:id', ({ params }, res) => {
  InvoiceDet.findById(params.id)

    .then(invoicedet => {
      res.json(invoicedet)
    }) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/getByInvoiceId/:id', ({ params }, res) => {
  InvoiceDet.find({ idInvoice: params.id })
    .populate('idProduct', 'name')
    .then(invoicedet => {
      res.json(invoicedet)
    }) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/getall/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  InvoiceDet.find()
    .sort({ createAt: -1 }) //desc = -1 acs = 1
    .then(invoicedet => res.json(invoicedet)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.put('/:id', ({ body, params }, res) => {
  const { idInvoice, idProduct, price, quantity, discount } = body
  const newInvoiceDet = {
    idInvoice,
    idProduct,
    price,
    quantity,
    discount,
    _id: params._id
  }
  InvoiceDet.findByIdAndUpdate(params._id, newInvoiceDet, { new: true })
    .then(invoicedet => {
      res.json(invoicedet)
    }) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/:objects/:page/:query', ({ params }, res) => {
  const { objects, page, query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  InvoiceDet.find({ idMember: { $regex: newQuery, $options: 'i' } })
    .limit(Number(objects))
    .skip(objects * (page - 1))
    //.sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(invoicedet => res.json(invoicedet)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  InvoiceDet.find({ name: { $regex: newQuery, $options: 'i' } })
    .countDocuments()
    .sort({ createddate: -1 }) //desc = -1 acs = 1
    .then(counter => res.json(counter)) //return lại item
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.post('/', ({ body }, res) => {
  const { idInvoice, idProduct, price, quantity, discount, _id } = body
  const newInvoiceDet = new InvoiceDet({
    idInvoice,
    idProduct,
    price,
    quantity,
    discount,
    _id
  })

  newInvoiceDet
    .save()
    .then(invoicedet => res.json(invoicedet)) //reutnr lại item đã save đc
    .catch(err => res.json(err)) //Catch lỗi rồi return ra;
})

router.delete('/:id', ({ params }, res) => {
  InvoiceDet.findByIdAndDelete(params.id)
    .then(item => res.json(item)) //Return lại item đã xóa
    .catch(err => res.json(err)) //Catch lỗi rồi return ra
})

export default router
