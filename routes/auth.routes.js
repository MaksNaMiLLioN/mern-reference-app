const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')
const {check, validationResult} = require('express-validator')


const router = Router()


// /api/auth/register
router.post(
    'register', 
    [
        check('email', 'Incorrect email').isEmail(), 
        check('password', 'Min password length 6 symbols')
            .isLength({min:6})
    ],
    async (req,res)=>{
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data in registration'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})

            if(candidate) {
                return res.status(400).json('User is already exists')
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({email, password: hashedPassword})

            await user.save()

            res.status(201).json('User has been created')

        } catch (e) {
            res.status(500).json('Something went wrong')
        }
    })

// /api/auth/login
router.post('login', 
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(), 
        check('password', 'Fill password').exists()
    ],
    async (req,res)=>{
        try{
            const errors = validationResult(req)

            if(!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data in Login'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user) {
                return res.status(400).json('User not found')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json('Incorrect password')
            }

            const token =jwt.sign(
                {userID: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json('Something went wrong')
        }
})


module.exports = router

