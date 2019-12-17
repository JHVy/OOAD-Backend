import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'dotenv/config'
import 'babel-core/register'
import 'babel-polyfill'
import bcrypt from 'bcryptjs'

import User from './models/User'
import Role from './models/Role'

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connect to mongodb')

  Role.findOne({ name: 'admin' })
    .then(role => {
      let roleID
      if (role === null) {
        console.log('Creating role admin')

        roleID = mongoose.Types.ObjectId()
        const roleAdmin = new Role({
          _id: roleID,
          name: 'admin',
          memberManagement: true,
          productManagement: true,
          categoryManagement: true,
          userManagement: true,
          invoiceManagement: true,
          supplierManagement: true,
          payslipManagement: true,
          materialManagement: true,
          roleManagement: true,
          materialReceiptNoteManagement: true
        })
        roleAdmin
          .save()
          .then(role => console.log(`Added Role ${role.name} succesfully`))
          .catch(err => console.log(err))
      } else console.log("Role 'Admin' already exists!!!")

      User.findOne({ username: 'admin' })
        .then(admin => {
          if (admin === null) {
            console.log('Creating user admin')
            const admin = new User({
              username: 'admin',
              idRole: roleID,
              password: 'admin'
            })
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(admin.password, salt, (err, hash) => {
                if (err) throw err
                admin.password = hash
                admin
                  .save()
                  .then(user => {
                    console.log(`Added user ${user.username}  succesfully`)
                  })
                  .catch(err => console.log(err))
              })
            })
          } else {
            console.log(`User ${admin.username} already exists!!!`)
          }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})
app.get('/ping', (req, res) => {
  res.json('pong')
})

app.use('/api/category', require('./routes/api/categories'))
app.use('/api/user', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/authentication'))
app.use('/api/role', require('./routes/api/roles'))
app.use('/api/member', require('./routes/api/members'))
app.use('/api/product', require('./routes/api/products'))
app.use('/api/invoice', require('./routes/api/invoices'))
app.use('/api/payslip', require('./routes/api/payslips'))
app.use('/api/material', require('./routes/api/materials'))
app.use('/api/storagereport', require('./routes/api/storagereports'))
app.use('/api/invoicedet', require('./routes/api/invoicedets'))
app.use('/api/supplier', require('./routes/api/suppliers'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
