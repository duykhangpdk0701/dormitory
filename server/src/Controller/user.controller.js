const mongoose = require('mongoose')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../Model/user.model');
const Staff = require('../Model/staff.model');
const Civilian = require('../Model/civilian.model');

class UserController {
    async load(req, res) {
        try {
            const aggregate = [
                { $match: { _id: new mongoose.Types.ObjectId(req.Id)} },
                {
                    $lookup: {
                        from: "permissions",
                        localField: "permission",
                        foreignField: "_id",
                        as: "permission"
                    }
                },
                { $unwind: '$permission' },
            ]
            let user = await User.aggregate(aggregate)
            user = user[0]
            if(user.permission.name == 'civilian'){
                const aggregate = [
                    { $match: { accountId : user._id } },
                    {
                        $lookup: {
                            from: "addresses",
                            localField: "address",
                            foreignField: "_id",
                            as: "address"
                        }
                    },
                    { $unwind: '$address' },
                    { $sort: { "priority.score": -1, createdAt: -1 } }
                ]
                const civilian = await Civilian.aggregate(aggregate)
                user.infor = civilian[0]
            }else if(user.permission.name == 'staff'){
                const aggregate = [
                    { $match: { accountId : user._id } },
                    {
                        $lookup: {
                            from: "addresses",
                            localField: "address",
                            foreignField: "_id",
                            as: "address"
                        }
                    },
                    { $unwind: '$address' },
                    { $sort: { "priority.score": -1, createdAt: -1 } }
                ]
                const staff = await Staff.aggregate(aggregate)
                user.infor = staff[0]
            }
            if(!user){
                return res.status(400).json({success: false, messages:'User not found'})
            }
            res.json({success: true, data: { user }})
        }
        catch(error){
            console.log(error);
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async login(req, res) {
        const {username, password} = req.body;
        try {
            const aggregate = [
                { $match: { username: username} },
                {
                    $lookup: {
                        from: "permissions",
                        localField: "permission",
                        foreignField: "_id",
                        as: "permission"
                    }
                },
                { $unwind: '$permission' },
            ]
            let user = await User.aggregate(aggregate)
            user = user[0]
            if(!user){
                return res.status(400).json({success: false, messages:'Tài khoản hoặc mật khẩu không hợp lệ'})
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Mật khẩu không hợp lệ'}) 
            }
            const accessToken = jwt.sign(
                { Id: user._id },
                process.env.ACCESS_TOKEN_SECRET
            )
            if(user.permission.name == 'civilian'){
                const aggregate = [
                    { $match: { accountId : user._id } },
                    {
                        $lookup: {
                            from: "addresses",
                            localField: "address",
                            foreignField: "_id",
                            as: "address"
                        }
                    },
                    { $unwind: '$address' },
                    { $sort: { "priority.score": -1, createdAt: -1 } }
                ]
                const civilian = await Civilian.aggregate(aggregate)
                user.infor = civilian[0]
            }else if(user.permission.name == 'staff'){
                const aggregate = [
                    { $match: { accountId : user._id } },
                    {
                        $lookup: {
                            from: "addresses",
                            localField: "address",
                            foreignField: "_id",
                            as: "address"
                        }
                    },
                    { $unwind: '$address' },
                    { $sort: { "priority.score": -1, createdAt: -1 } }
                ]
                const staff = await Staff.aggregate(aggregate)
                user.infor = staff[0]
            }
            res.json({ success: true, messages: 'Đăng nhập thành công', data: { accessToken, user }})
        }
        catch(error){
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async register(req, res) {
        const {username, password} = req.body;
        try {
            const user = await User.findOne({ username });
            if(user){
                return res.status(400).json({success: false,messages:'Tên tài khoản đã tồn tại'});
            }
            const hashpassword = await argon2.hash(password);
            const newUser = new User({...req.body, password:hashpassword, avatar: "/images/avatar.png"})
            await newUser.save()

            const accessToken = jwt.sign(
                { Id: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )
            res.json({ success:true, messages:'Đăng ký thành công', data: { accessToken }})
        } catch (error) {
            res.status(500).json({ success: false, message: req.body });
        }
    }

    async changePassword(req, res) {
        const {username, password, newPassword} = req.body;
        if(!username || !password || !newPassword) return res.status(400).json({success: false, messages: 'Missing data'});
        try {
            const user = await User.findOne({ username });
            if(!user){
                return res.status(400).json({success: false,messages:'Tên tài khoản không chính xác'});
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Mật khẩu không chính xác'}) 
            }
            const hashpassword = await argon2.hash(newPassword);
            await User.updateOne({ username },{ password:hashpassword })

            res.json({ success:true, messages:'Thay đổi mật khẩu thành công' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async changeInfor(req, res) {
        const { username } = req.body;
        if(!username) return res.status(400).json({success: false, messages: 'Thiếu thông tin tài khoản'});
        try {
            const user = await User.findOne({ username });
            if(!user){
                return res.status(400).json({success: false,messages:'Tài khoản không hợp lệ'});
            }
            await User.updateOne({ username }, req.body)

            res.json({ success:true, messages:'Thay đổi thông tin thành công' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async changeAvatar(req, res) {
        const { username } = req.body;
        if(!username) return res.status(400).json({success: false, messages: 'Thiếu thông tin tài khoản'});
        try {
            const user = await User.findOne({ username });
            if(!user){
                return res.status(400).json({success: false,messages:'Tài khoản không hợp lệ'});
            }
            await User.updateOne({ username }, { avatar: "/images/"+ req.file.filename })

            res.json({ success:true, messages:'Đổi avatar thành công' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new UserController()