const User = require('./models/User');

const findUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw Error('User not found');
    return user;
}

const updateOne = async (userId, isBlocked) => {
    try {
        const user = await findUserById(userId)
        user.isBlocked = isBlocked
        await user.save()
        return user
    } catch (e) {
        console.log(e)
    }
}

const deleteOne = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw Error('User not found');
    return user
}


class UserController {

    async updateStatus(req, res) {
        try {
            const {userId} = req.body
            const user = await findUserById(userId)
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

    async blockMany(req, res) {
        try {
            const usersIdArray = req.body
            usersIdArray.map(async (userId) => await updateOne(userId, true))
            return res.status(200).json("Successfully blocked users");
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e});
        }
    }

    async unBlockMany(req, res) {
        try {
            const usersIdArray = req.body
            usersIdArray.map(async (userId) => await updateOne(userId, false))
            return res.status(200).json("Successfully blocked users");
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e});
        }
    }

    async deleteMany(req, res) {
        try {
            const usersIdArray = req.body
            usersIdArray.map(async (userId) => await deleteOne(userId))
            return res.status(200).json("Successfully deleted users")
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e});
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