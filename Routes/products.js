const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        const productsCollection = client.db("mehedi-mart").collection("products")





        router.get("/", async (req, res) => {
            const data = await productsCollection.find().toArray()
            res.send(data)
        })

        // router.get("/:id", async (req, res) => {
        //     const brand = req.params.id
        //     const filter = { brand: brand }
        //     const data = await productsCollection.find(filter).toArray()
        //     res.send(data)
        // })










    } finally { }
}
run().catch(console.log);



module.exports = router