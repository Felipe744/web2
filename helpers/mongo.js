const mongoose = require("mongoose")

module.exports = (req, res, next) => {
    mongoose.connect("mongodb://localhost:27017/test&ssl=true").catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}