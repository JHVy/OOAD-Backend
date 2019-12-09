import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import auth from '../../middleware/auth'
import 'dotenv/config'

import User from '../../models/User'

router.post('/', async ({ body }, res, next) => {
  try {
    const { username, password } = body

    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' })
    }

    let user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist" })
    }

    let isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }

    let token = jwt.sign(
      {
        id: user.id,
        role: user.idRole
      },
      process.env.jwtSecret,
      { expiresIn: 24 * 3600 }
    )

    res.json({
      token,
      user: {
        name: user.username,
        id: user.id,
        idRole: user.idRole,
        fullName: user.fullName
      }
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/user', auth, ({ user }, res) => {
  User.findById(user.id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

export default router