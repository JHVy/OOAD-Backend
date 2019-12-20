const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MaterialReceiptNoteDetSchema = new Schema(
  {
    idMaterialReceiptNote: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'MaterialReceiptNotes'
    },
    idMaterial: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Materials'
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
