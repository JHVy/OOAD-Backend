import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PayslipSchema = new Schema(
  {
    idUser: {
      type: String,
      required: false
    },
    idSupplier: {
      type: String,
      required: false
    },
    createddate: {
      type: Date,
      required: false,
      default: Date.now()
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
