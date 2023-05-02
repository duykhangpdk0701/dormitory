const userRouter = require("./user.route");
const permissionRouter = require("./permission.route");
const priorityRouter = require("./priority.route");
const bookingRequestRouter = require("./bookingRequest.route");
const bookingRouter = require("./booking.route");
const roomTypeRouter = require("./roomType.route");
const roomRouter = require("./room.route");
const addressRouter = require("./address.route");
const civilianRouter = require("./civilian.route");
const contractRouter = require("./contract.route");
const deviceRouter = require("./device.route");
const occupancyRouter = require("./occupancy.route");
const serviceRouter = require("./service.route");
const serviceUsageRouter = require("./serviceUsage.route");
const staffRouter = require("./staff.route");
const taskRouter = require("./task.route");
const jobRouter = require("./job.route");

const Route = (app) => {
    app.use("/user", userRouter);
    app.use("/permission", permissionRouter);
    app.use("/priority", priorityRouter);
    app.use("/bookingRequest", bookingRequestRouter);
    app.use("/booking", bookingRouter);
    app.use("/roomType", roomTypeRouter);
    app.use("/room", roomRouter);
    app.use("/address", addressRouter);
    app.use("/civilian", civilianRouter);
    app.use("/contract", contractRouter);
    app.use("/device", deviceRouter);
    app.use("/occupancy", occupancyRouter);
    app.use("/service", serviceRouter);
    app.use("/serviceUsage", serviceUsageRouter);
    app.use("/staff", staffRouter);
    app.use("/task", taskRouter);
    app.use("/job", jobRouter);
};

module.exports = Route;
