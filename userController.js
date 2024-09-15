const User = require('./models/User');

class UserController {
    async findUser(req, res) {
        const {userId} = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json('User not found');
        return user;
    }

    async updateStatus(req, res) {
        try {
            const {userId} = req.body
            const user = await User.findById(userId);
            if (!user) return res.status(404).json('User not found');
            user.isBlocked = !user.isBlocked
            await user.save()
            return res.status(200).json({user})
        } catch (e) {
            console.log(e)
            return res.status(404).json('User not found');
        }
    }

    async getUsers(req, res) {
        try{
            const users = await User.find()
            return res.status(200).json({users})
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUser(req, res) {
        try {
            const {userId} = req.body
            const user = await User.findByIdAndDelete(userId);
            if (!user) return res.status(404).json('User not found');
            return res.status(200).json({user})
        } catch (e) {
            return res.status(404).json('User not found');
        }
    }

    test(req,res) {
        return res.status(200).json("123")
    }


}

module.exports = new UserController();