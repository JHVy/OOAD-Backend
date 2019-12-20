import mongoose from 'mongoose'
const Schema = mongoose.Schema

//Create Schema

const StorageReportSchema = new Schema(
  {
    //Không cần thuộc tính ID vì trong MongoDB sẽ tự tạo ID cho mình khi insert vào
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, //=> khi insert vào thì bắt buộc phải có "name"
      ref: 'Users'
    },
    idMaterial: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Materials'
    },
    quantity: {
      type: Number, // Kiểu Number
      required: true,
      default: 0
    },
    createddate: {
      type: Date,
      required: true,
      default: Date.now()
    }
  },
  { collection: 'StorageReports' }
)
const StorageReport = mongoose.model('StorageReports', StorageReportSchema)
export default StorageReport
