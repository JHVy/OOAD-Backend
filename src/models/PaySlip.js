import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PayslipSchema = new Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Users'
    },
    idSupplier: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Suppliers'
    },
    createddate: {
      type: Date,
      required: false,
      default: Date.now()
    },
    comment: {
      type: String
    },
    totalAmt: {
      type: Number,
      required: false,
      default: 0
    }
  },
  { collection: 'Payslips' }
)

const Payslip = mongoose.model('Payslips', PayslipSchema)

export default Payslip
