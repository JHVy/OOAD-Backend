const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema

const InvoiceSchema = new Schema(
  {
    //Không cần thuộc tính ID vì trong MongoDB sẽ tự tạo ID cho mình khi insert vào
    idMember: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Members'
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
    },
    totalAmt: {
      type: Number,
      required: true,
      default: 0
    },
    createddate: {
      type: Date,
      required: false,
      default: new Date()
    },
    comments: {
      type: String,
      required: false
    },
    status: {
      type: Number,
      default: 1
    },
    discount: {
      type: Number,
      default: 0
    }
  },
  { collection: 'Invoices' }
)
const Invoice = mongoose.model('Invoices', InvoiceSchema)
export default Invoice
