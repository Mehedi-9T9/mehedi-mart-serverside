const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000

require('dotenv').config()
const app = express()

const products = require("./Routes/products")

//middlewara
app.use(cors())
app.use(express.json())


//routes
app.use("/products", products)


//running Port
app.listen(port, () => {
    console.log(`The server in running port: ${port}`);
})
