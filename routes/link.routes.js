const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
router.post('/generate', async (req,res) => {
    try {
        
    
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
})


router.get('/', auth,
    async(req,res)=>{
    try {
        const links = await Link.find({owner: null}) //>>>????
        return res.json(links)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


router.get('/:id', async(req,res)=>{
    try {
        const links = await Link.findById({req.params.id}) //>>>????
        return res.json(links) 
    
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


module.exports = router