const userModel = require('../model/userModel');
const userExistsMiddleware = async (req, res, next) => {

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Server error while validating user' });
    }
};
module.exports = userExistsMiddleware;
