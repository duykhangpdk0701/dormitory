const userRouter = require('./user.route')
const permissionRouter = require('./permission.route')
const priorityRouter = require('./priority.route')
const bookingRequestRouter = require('./bookingRequest.route')
const bookingRouter = require('./booking.route')
const roomTypeRouter = require('./roomType.route')
const roomRouter = require('./room.route')

const Route = (app) => {
    app.use('/user', userRouter),
    app.use('/permission', permissionRouter),
    app.use('/priority', priorityRouter),
    app.use('/bookingRequest', bookingRequestRouter)
    app.use('/booking', bookingRouter)
    app.use('/roomType', roomTypeRouter)
    app.use('/room', roomRouter)
}

module.exports = Route;