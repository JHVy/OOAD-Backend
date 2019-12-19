function role(role = []) {
  return [
    (req, res, next) => {
      let arrayOfRoles = createArrayOfRoles(req.user.role)

      if (role.length) {
        role.map(eachRole => {
          if (!arrayOfRoles.includes(eachRole)) {
            // user's role is not authorized
            return res
              .status(401)
              .json({ msg: 'You have no permision to do this action' })
          }
        })
      }
      next()
    }
  ]
}

function createArrayOfRoles(obj) {
  var newArray = []

  for (let eachVar in obj) {
    if (typeof obj[eachVar] === 'boolean' && obj[eachVar] === true) {
      newArray.push(eachVar)
    }
  }
  return newArray
}

export default role
