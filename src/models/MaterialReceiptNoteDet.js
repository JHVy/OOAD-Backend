const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaterialReceiptNoteDetSchema = new Schema(
  {
    idMaterialReceiptNote: {
      type: String,
      required: true
    },
    idMaterial: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { collection: 'MaterialReceiptNoteDets' }
)

const MaterialReceiptNoteDet = mongoose.model(
  'MaterialReceiptNoteDets',
  MaterialReceiptNoteDetSchema
)
export default MaterialReceiptNoteDet
