import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ParameterSchema = new Schema({
  maxPoint: {
    type: String,
    required: true
  },
  systemDiscount: {
    type: String,
    required: true
  },
  memberPointDiscount: {
    type: String,
    required: true
  }
})

const Parameter = mongoose.model('Parameters', ParameterSchema)

export default Parameter
