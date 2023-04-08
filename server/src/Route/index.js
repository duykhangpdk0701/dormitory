const userRouter = require('./user.route')
const permissionRouter = require('./permission.route')

const Route = (app) => {
    app.use('/user', userRouter),
    app.use('/permission', permissionRouter)
}

module.exports = Route;