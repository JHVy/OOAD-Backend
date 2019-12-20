import express from 'express'
const router = express.Router()
import MaterialReceiptNoteDet from '../../models/MaterialReceiptNoteDet'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'
import mongoose from 'mongoose'

router.get(
  '/:id',
  auth,
  role([Role.materialReceiptNoteManagement]),
  ({ params }, res) => {
    MaterialReceiptNoteDet.find({ idMaterialReceiptNote: params.id })
      .populate({
        path: 'idMaterialReceiptNote',
        populate: ['idUser', 'idSupplier']
      })
      .populate('idMaterial', 'name')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.json(err))
  }
)

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

export default router
