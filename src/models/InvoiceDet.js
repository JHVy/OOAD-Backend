import mongoose from 'mongoose'
const Schema = mongoose.Schema

//Create Schema

const InvoiceDetSchema = new Schema(
  {
    //Không cần thuộc tính ID vì trong MongoDB sẽ tự tạo ID cho mình khi insert vào
    idInvoice: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Invoices'
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Products'
    },
    price: {
      type: Number,
      required: false,
      default: 0
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { collection: 'InvoiceDets' }
)

const InvoiceDet = mongoose.model('InvoiceDets', InvoiceDetSchema)
export default InvoiceDet
