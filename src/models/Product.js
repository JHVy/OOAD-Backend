const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema

const ProductSchema = new Schema({
  //Không cần thuộc tính ID vì trong MongoDB sẽ tự tạo ID cho mình khi insert vào
  idCategory: {
    type: String, // Kiểu String
    required: true //=> khi insert vào thì bắt buộc phải có "idCategory"
  },
  name: {
    type: String, // Kiểu String
    required: false //=> khi insert vào thì bắt buộc phải có "name"
  },
  price: {
    type: Number, // Kiểu String
    required: false
  },

  linkpic: {
    type: String,
    required: false
  },
  status: {
    type: Number,
    required: false,
    default: 1
  }
})

const Product = mongoose.model('product', ProductSchema)
export default Product
