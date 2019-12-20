const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaterialReceiptNoteSchema = new Schema(
  {
    idSupplier: {
      type: String,
      required: true,
      ref: 'Suppliers'
    },
    idUser: {
      type: String,
      required: true,
      ref: 'Users'
    },
    createddate: {
      type: Date,
      required: true
    }
  },
  { collection: 'MaterialReceiptNotes' }
)

const MaterialReceiptNote = mongoose.model(
  'MaterialReceiptNotes',
  MaterialReceiptNoteSchema
)
export default MaterialReceiptNote
