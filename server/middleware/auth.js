import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, msg: 'Missing token' })
    }

    try {
        const payload = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
        req.user = { id: payload.id }
        next()
    } catch {
        return res.status(401).json({ success: false, msg: 'Invalid or expired token' })
    }
}

export default auth