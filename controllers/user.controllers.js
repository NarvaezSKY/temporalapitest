import User from '../models/user.model.js'

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await new User({
            name: user.name,
            username: user.username,
            image: user.image
        }).save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) return res.status(404).json({ message: "User not found" });
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}