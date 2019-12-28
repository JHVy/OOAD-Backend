import express from 'express'
const router = express.Router()
import Parameter from '../../models/Parameter'
import auth from '../../middleware/auth'
import role from '../../middleware/role'
import Role from '../../Role'

router.get('/:id', auth, role(['categoryManagement']), ({ params }, res) => {
  Parameter.findById(params.id)
    .then(parameter => {
      res.json(parameter)
    })
    .catch(err => res.json(err))
})

router.get(
  '/getall/parameter',
  auth,
  role([Role.categoryManagement]),
  (req, res) => {
    Parameter.find()
      .sort({ maxPoint: -1 }) //desc = -1 acs = 1
      .select('maxPoint')
      .then(roles => res.json(roles)) //return lại item
      .catch(err => res.json(err)) //Catch lỗi rồi return ra;
  }
)

router.put(
  '/:id',
  auth,
  role([Role.categoryManagement]),
  ({ params, body }, res) => {
    const newItem = {
      maxPoint: body.maxPoint,
      systemDiscount: body.systemDiscount,
      memberPointDiscount: body.memberPointDiscount,
      _id: params.id
    }
    Parameter.findByIdAndUpdate(params.id, newItem, { new: true })
      .then(parameter => {
        res.json(parameter)
      })
      .catch(err => res.json(err))
  }
)

router.get(
  '/:objects/:page/:query',
  auth,
  role([Role.categoryManagement]),
  ({ params }, res) => {
    const { objects, page, query } = params
    let newQuery = ''
    if (query === 'undefined') newQuery = ''
    else newQuery = query

    Parameter.find({ maxPoint: { $regex: newQuery, $options: 'i' } })
      .limit(Number(objects))
      .skip(objects * (page - 1))
      .sort({ maxPoint: -1 })
      .then(parameter => res.json(parameter))
      .catch(err => res.json(err))
  }
)

router.get('/count/:query', ({ params }, res) => {
  const { query } = params
  let newQuery = ''
  if (query === 'undefined') newQuery = ''
  else newQuery = query
  Parameter.find({ maxPoint: { $regex: newQuery, $options: 'i' } })
    .countDocuments()
    .sort({ maxPoint: -1 })
    .then(counter => res.json(counter))
    .catch(err => res.json(err))
})

router.post('/', auth, role([Role.categoryManagement]), ({ body }, res) => {
  const newCategory = new Parameter({
    _id: body._id,
    maxPoint: body.maxPoint,
    systemDiscount: body.systemDiscount,
    memberPointDiscount: body.memberPointDiscount
  })

  newCategory
    .save()
    .then(parameter => res.json(parameter))
    .catch(err => res.json(err))
})

router.delete(
  '/:id',
  auth,
  role([Role.categoryManagement]),
  ({ params }, res) => {
    Parameter.findByIdAndDelete(params.id)
      .then(item => res.json(item))
      .catch(err => res.json(err))
  }
)

export default router
