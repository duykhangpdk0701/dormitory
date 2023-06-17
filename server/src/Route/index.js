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
const serviceRouter = require("./service.route");
const serviceUsageRouter = require("./serviceUsage.route");
const staffRouter = require("./staff.route");
const taskRouter = require("./task.route");
const jobRouter = require("./job.route");
const feedbackRouter = require("./feedback.route");
const complaintRouter = require("./complaint.route");
const ConversationRouter = require('./conversation.route');
const MessageRouter = require('./message.route');
const ViolationRouter = require('./violation.route');
const BillRouter = require('./bill.route');
const ElectronicWaterRouter = require('./electronicWater.route');
const RequestChangeRoomRouter = require('./requestChangeRoom.route');

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
    app.use("/service", serviceRouter);
    app.use("/serviceUsage", serviceUsageRouter);
    app.use("/staff", staffRouter);
    app.use("/task", taskRouter);
    app.use("/job", jobRouter);
    app.use("/feedback", feedbackRouter);
    app.use("/complaint", complaintRouter);
    app.use('/conversation', ConversationRouter);
    app.use('/message', MessageRouter);
    app.use('/violation', ViolationRouter);
    app.use('/bill', BillRouter);
    app.use('/electronicWater', ElectronicWaterRouter);
    app.use('/requestChangeRoom', RequestChangeRoomRouter);
};

module.exports = Route;
