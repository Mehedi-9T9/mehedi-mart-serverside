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

        router.get("/title", async (req, res) => {
            const title = req.query.title
            const data = await productsCollection.find({ title: new RegExp(title, "i") }).toArray()
            res.send(data)
            // console.log(title);
        })

        router.get("/category/", async (req, res) => {
            const category = req.query.category
            const filter = { category }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
        })
        router.get("/brand/", async (req, res) => {
            const brand = req.query.brand
            const filter = { brand }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
        })
        router.get("/categoryBrand/", async (req, res) => {
            const brand = req.query.brand
            const category = req.query.category
            const filter = { brand, category }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
            // console.log(brand, category);
        })
        router.get("/price/", async (req, res) => {
            const min = req.query.min
            const max = req.query.max
            const minPrice = Number(min)
            const maxPrice = Number(max)
            const filter = {
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }
            }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
            // console.log(brand, category);
        })
        router.get("/mixed/", async (req, res) => {
            const min = req.query.min
            const max = req.query.max
            const minPrice = Number(min)
            const maxPrice = Number(max)

            const brand = req.query.brand
            const category = req.query.category

            const filter = {
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }, category, brand
            }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
            // console.log(brand, category);
        })


        router.get("/categoryPrice/", async (req, res) => {
            const min = req.query.min
            const max = req.query.max
            const minPrice = Number(min)
            const maxPrice = Number(max)

            // const brand = req.query.brand
            const category = req.query.category

            const filter = {
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }, category
            }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
            // console.log(brand, category);
        })
        router.get("/brandPrice/", async (req, res) => {
            const min = req.query.min
            const max = req.query.max
            const minPrice = Number(min)
            const maxPrice = Number(max)

            const brand = req.query.brand
            // const category = req.query.category

            const filter = {
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                }, brand
            }
            const data = await productsCollection.find(filter).toArray()
            res.send(data)
            // console.log(brand, category);
        })










    } finally { }
}
run().catch(console.log);



module.exports = router