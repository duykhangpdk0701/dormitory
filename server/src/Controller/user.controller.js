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
            res.json({success: true, user})
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
                return res.status(400).json({success: false, messages:'Incorrect username or password'})
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Invalid password'}) 
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
            res.json({ success: true, messages: 'Login successfully', accessToken, user})
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
                return res.status(400).json({success: false,messages:'Username already taken'});
            }
            const hashpassword = await argon2.hash(password);
            const newUser = new User({...req.body, password:hashpassword})
            await newUser.save()

            const accessToken = jwt.sign(
                { Id: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )
            res.json({ success:true, messages:'Register successfully', accessToken })
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
                return res.status(400).json({success: false,messages:'Username uncorrect'});
            }
            const passowrdvalid = await argon2.verify(user.password,password)
            if(!passowrdvalid){ 
                return res.status(500).json({success: false, messages: 'Invalid password'}) 
            }
            const hashpassword = await argon2.hash(newPassword);
            await User.updateOne({ username },{ password:hashpassword })

            res.json({ success:true, messages:'Change password successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async changeInfor(req, res) {
        const { username } = req.body;
        if(!username) return res.status(400).json({success: false, messages: 'Missing username'});
        try {
            const user = await User.findOne({ username });
            if(!user){
                return res.status(400).json({success: false,messages:'Username uncorrect'});
            }
            await User.updateOne({ username }, req.body)

            res.json({ success:true, messages:'Change password successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new UserController()