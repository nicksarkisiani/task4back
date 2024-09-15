const User = require('./models/User');
const bcrypt = require("bcryptjs")
const {validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {secret} = require("./config");
const SALT = 7


const generateAccessToken = (id, email) => {
    const payload = {
        id, email
    }
    return jwt.sign(payload, secret, {expiresIn: "30d"})
}

class AuthController {
    async registration(req, res) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: errors.array()});
            }
            const { name, email, password } = req.body;
            const candidate = await User.findOne({name})
            if(candidate) return res.status(400).json({error: "Candidate already exists"})
            const hashedPassword = await bcrypt.hash(password, SALT);
            const user = new User({name, email, password: hashedPassword})
            const token = generateAccessToken(user._id, user.email)
            await user.save()
            return res.status(200).json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"});
        }
    }

    async login(req, res) {
        try{
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({error: "User not found"})
            const validPassword = bcrypt.compare(password, user.password);
            if(!validPassword) return res.status(400).json({error: "Invalid Password"})
            if(user.isBlocked === true) return res.status(403).json({message: "User is blocked"})
            user.last_updated = Date.now();
            await user.save()
            const token = generateAccessToken(user._id, user.email)
            return res.status(200).json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"});
        }
    }

    async verifyToken(req, res) {
        try {
            const {token} = req.body;
            const decodedDate = jwt.verify(token, secret);
            return res.status(200).json(decodedDate)
        } catch (e) {
            res.status(400).json({message: "Invalid token"});
        }
    }
}

module.exports = new AuthController();