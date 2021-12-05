const User = require('../models/userModel');

const bcrypt = require('bcrypt');

exports.signIn = async (req,res) => {
    try {
        const { username , password } = req.body;

        const user = await User.findOne({username});
        console.log(user)
        if(!user)
            res.status(404).json({ auth: false, msg: "User not found!" })
        else{
            const passwordIsValid = await bcrypt.compare(password,user.password);
            if (!passwordIsValid) {
                res.status(401).json({ auth: false, msg: "Invalid Password!" });
            }else{
                res.status(200).json({ auth: true, msg: "Logged in!" })
            }
        }
    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }
}

exports.signUp = async (req,res) => {
    try {
        const { username , password } = req.body;

        const newUser = await User.create({username,password:await bcrypt.hash(password, 12)});

        res.status(201).json({
            status:'Sign up successfull.',
            data:newUser
        })
    } catch (error) {
        res.status(400).json(error);
        console.log({status:'fail',error});
    }
}