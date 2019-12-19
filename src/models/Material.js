import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { collection: 'Materials' }
)

const Material = mongoose.model('Materials', MaterialSchema)

export default Material
