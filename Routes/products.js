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
        const myCartCollection = client.db("mehedi-mart").collection("myCart")

        //pazination route

        router.get("/", async (req, res) => {
            const page = parseInt(req.query.page);
            const size = 6;
            const data = await productsCollection.find().skip(page * size).limit(size).toArray()
            res.send(data)
        })
        //Search related apis
        router.get("/title", async (req, res) => {
            const title = req.query.title
            const data = await productsCollection.find({ title: new RegExp(title, "i") }).toArray()
            res.send(data)
        })

        //Shorting apis
        router.get("/lowToHigh", async (req, res) => {
            const data = await productsCollection.find().sort({ price: 1 }).toArray()
            res.send(data)

        })
        router.get("/highToLow", async (req, res) => {
            const data = await productsCollection.find().sort({ price: -1 }).toArray()
            res.send(data)

        })
        //categoriazion
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

        router.get("/singleData/", async(req, res)=>{
            const id = req.query.id
            const numId = Number(id)
            const data =await productsCollection.findOne({productId:numId})
            res.send(data)
        })

        router.get("/similarData/", async(req, res)=>{
            const category = req.query.category
            const brand = req.query.brand
           const filter={category,brand} 
            const data =await productsCollection.find(filter).limit(3).toArray()
            res.send(data)
        })
       

        // my cart data related apis
        router.post("/myCart", async(req, res)=>{
            const myCart =req.body
            const data =await myCartCollection.insertOne(myCart)
            res.send(data)
        })

        router.get("/mycartProducts", async(req, res)=>{
            const data =await myCartCollection.find().toArray()
            res.send(data)
        })

        router.delete("/mycartDelete/",async(req, res)=>{
            const id =req.query.id
           const newId= Number(id)
            const data =await myCartCollection.deleteOne({productId:newId})
            res.send(data)

        })

       










    } finally { }
}
run().catch(console.log);



module.exports = router