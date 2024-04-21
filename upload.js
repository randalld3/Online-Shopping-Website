const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public", "images"))
    },
    filename: (req, file, cb) => {
        const name = file.originalname
        const ext = path.extname(name)
        const newName = req.body.name + ext
        cb(null, newName)
    }
})

const imageUpload = multer({storage : storage})

module.exports = imageUpload