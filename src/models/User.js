import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    idRole: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Roles'
    },

    username: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String
    },
    phoneNumber: {
      type: String,
      unique: true
    },

    address: {
      type: String
    }
  },
  { collection: 'Users' }
)

const User = mongoose.model('Users', UserSchema)

export default User
