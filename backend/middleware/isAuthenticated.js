import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Token" });
        }
        //token verification
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.userId = decoded.id; // User-defined property (added by the developer).
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Token" });
    }
};