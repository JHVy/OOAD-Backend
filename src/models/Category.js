import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    createAt: {
      type: Date,
      required: true,
      default: Date.now()
    }
  },
  { collection: 'Categories' }
)

const Category = mongoose.model('Categories', CategorySchema)

export default Category
