import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../../models/index.js';
dotenv.config();
const { sign, verify } = jsonwebtoken;
export function verifyToken(token) {
    try {
        const data = verify(token, process.env.JWT_SECRET);
        return data;
    }
    catch (error) {
        console.log('VERIFY TOKEN ERROR - JWT', error);
        return false;
    }
}
export function createToken(user_id) {
    try {
        const token = sign({ user_id: user_id }, process.env.JWT_SECRET);
        return token;
    }
    catch (error) {
        console.log('CREATE TOKEN ERROR - JWT');
        throw error;
    }
}
export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({
            message: 'You are not authorized to perform that action'
        });
        return;
    }
    const userData = verifyToken(token);
    if (userData && typeof userData !== 'string') {
        const { user_id } = userData;
        const user = await User.findByPk(user_id);
        req.user = user;
        next();
    }
    else {
        res.status(401).json({
            message: 'Invalid token'
        });
    }
};
