const jwt = require('jsonwebtoken')
const Account = require('../Model/user.model')
const mongoose = require('mongoose');

const verifyRoleAdmin = async (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Không có token' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await Account.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(decoded.Id) }
            },
            {
                $lookup: {
                    from: "permissions",
                    localField: "permission",
                    foreignField: "_id",
                    as: "permission"
                }
            },
            { $unwind: '$permission' },
        ])
		if(user[0] && user[0].permission.name === "admin"){
            next()
        }else{
            return res.status(403).json({ success: false, messages: 'Bạn không có quyền thực hiện hành động này' })
        }
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, messages: 'Token không hợp lệ' })
	}
}

const verifyRoleStaff = async (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Không có token' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await Account.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(decoded.Id) }
            },
            {
                $lookup: {
                    from: "permissions",
                    localField: "permission",
                    foreignField: "_id",
                    as: "permission"
                }
            },
            { $unwind: '$permission' },
        ])
		if(user[0] && user[0].permission.name !== "civilian"){
            next()
        }else{
            return res.status(403).json({ success: false, messages: 'Bạn không có quyền thực hiện hành động này' })
        }
	} catch (error) {
		return res.status(500).json({ success: false, messages: error })
	}
}

module.exports = {verifyRoleAdmin, verifyRoleStaff}
