const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000

require('dotenv').config()
const app = express()

const products = require("./Routes/products")

const routerHandle = require("./RouterHandle/RouterHandle")

//middlewara
app.use(cors())
app.use(express.json())

// database connect
const mongoose = require('mongoose');
const uri = process.env.URI;

mongoose.connect(uri)
    .then(() => console.log('mongoose connect successfull'))
    .then((error) => console.log(error))


//routes
app.use("/products", products)


//new work
app.get('/', (req, res) => {
    res.send("server is running")
})

app.use("/user", routerHandle)

//running Port
app.listen(port, () => {
    console.log(`The server in running port: ${port}`);
})
