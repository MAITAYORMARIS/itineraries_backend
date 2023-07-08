const express = require('express')
require('dotenv').config()
require('./config/database')
const app = express()

const PORT = process.env.PORT || 4000

app.set('port', PORT)

app.get("/",(req,res)=>{
    res.send("SERVIDOR PARA ITINERARIES CREADO CORRECTAMENTE")
})

app.listen(PORT,()=>{
    console.log("SERVIDOR CORRIENDO EN EL PUERTO:" + app.get('port'))
}
)
