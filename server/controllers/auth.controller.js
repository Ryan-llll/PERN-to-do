import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const users = []
let next_user_id = 1

const register = async (req, res) => {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Email and password are required' })
    }

    const clean_email = email.trim().toLowerCase()

    if (users.find((u) => u.email === clean_email)) {
        return res.status(409).json({ success: false, msg: 'Email already registered' })
    }

    const password_hash = await bcrypt.hash(password, 10)
    const user = { id: next_user_id++, email: clean_email, password_hash }
    users.push(user)

    res.status(201).json({ success: true, data: { id: user.id, email: user.email } })
}

const login = async (req, res) => {
    const { email, password } = req.body ?? {}

    if (!email || !password) {
        return res.status(400).json({ success: false, msg: 'Email and password are required' })
    }

    const user = users.find((u) => u.email === email.trim().toLowerCase())
    const match = user && (await bcrypt.compare(password, user.password_hash))

    if (!match) {
        return res.status(401).json({ success: false, msg: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ success: true, data: { token } })
}

export { register, login }