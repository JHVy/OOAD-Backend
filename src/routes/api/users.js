import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import User from '../../models/User'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'

router.post(
  '/',
  auth,
  role([Role.userManagement]),
  async ({ body }, res, next) => {
    try {
      const {
        idRole,
        username,
        fullName,
        phoneNumber,
        address,
        password,
        _id
      } = body

      if (!username || !idRole || !fullName || !phoneNumber || !address) {
        return res.status(400).json({ msg: 'Please enter all fields' })
      }

      let user = await User.findOne({ username })

      if (user) {
        return res.status(400).json({ msg: 'User already exist' })
      }

      let userPhone = await User.findOne({ phoneNumber })

      if (userPhone) {
        return res.status(400).json({ msg: 'Phone already used' })
      }

      let newUser = new User({
        username,
        idRole,
        fullName,
        phoneNumber,
        address
      })
      console.log(newUser)

      if (_id) newUser['_id'] = _id
      if (password) newUser['password'] = password
      else newUser['password'] = 'user'
      console.log(newUser)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {
              jwt.sign(
                {
                  id: user.id,
                  idRole: user.idRole,
                  role
                },
                process.env.jwtSecret,
                { expiresIn: 24 * 3600 },
                (err, token) => {
                  if (err) throw err
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      idRole: user.idRole
                    },
                    role
                  })
                }
              )
            })

            .catch(err => res.json(err))
        })
      })
    } catch (error) {
      return next(error)
    }
  }
)

router.get('/:id', auth, role([Role.userManagement]), ({ params }, res) => {
  User.findById(params.id)
    .populate('idRole', 'name')
    .then(user => {
      res.json(user)
    })
    .catch(err => res.json(err))
})

router.put(
  '/:id',
  auth,
  role([Role.userManagement]),
  ({ body, params }, res) => {
    const { idRole, username, fullName, phoneNumber, address } = body
    const newUser = {
      idRole,
      username,
      fullName,
      phoneNumber,
      address
    }

    User.findByIdAndUpdate(params.id, newUser, { new: true })
      .then(user => {
        res.json(user)
      })
      .catch(err => res.json(err))
  }
)

router.get(
  '/:objects/:page/:query',
  auth,
  role([Role.userManagement]),
  ({ params }, res) => {
    const { objects, page, query } = params
    let newQuery = ''
    if (query === 'undefined') newQuery = ''
    else newQuery = query

    User.find({
      username: { $regex: newQuery, $options: 'i', $nin: ['admin', 'Admin'] }
    })
      .limit(Number(objects))
      .populate('idRole', 'name')
      .skip(objects * (page - 1))

      .then(user => res.json(user))
      .catch(err => res.json(err))
  }
)

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query

  User.find({ username: { $regex: newQuery, $options: 'i' } })
    .countDocuments()
    .sort({ createAt: -1 })
    .then(counter => res.json(counter))
    .catch(err => res.json(err))
})

router.delete('/:id', auth, role([Role.userManagement]), ({ params }, res) => {
  User.findByIdAndDelete(params.id)
    .then(item => res.json(item))
    .catch(err => res.json(err))
})

router.put(
  '/cp/:id',
  auth,
  role([Role.userManagement]),
  async ({ body, params }, res, next) => {
    try {
      const { username, currentPassword, newPassword } = body

      let user = await User.findById(params.id)

      if (!user) {
        return res.status(225).json({ msg: "User doesn't exist" })
      }

      let isMatchPassword = await bcrypt.compare(currentPassword, user.password)
      if (!isMatchPassword)
        return res.status(225).json({ msg: 'Password is not correct' })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err

          const user = {
            password: hash
          }
          User.findByIdAndUpdate(params.id, user, { new: true })
            .select('-password')
            .then(newOne => res.json(newOne))
            .catch(err => res.json(err))
        })
      })
    } catch (err) {
      return next(err)
    }
  }
)

export default router
