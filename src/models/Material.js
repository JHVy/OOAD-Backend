import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: true
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
