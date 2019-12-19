import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MaterialSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

const Material = mongoose.model('material', MaterialSchema)

export default Material
