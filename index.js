require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors())
app.use(express.json())


//Orbitask
//Mqxi44H70G2lehzv


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nx8zq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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


    const taskCollection = client.db("tasks").collection("task");
    const taskUsersCollection = client.db("taskUsers").collection("taskUser");

    // await client.connect();

    app.get('/viewtask/:id', async(req, res) =>{
      const id = req.params.id 
      const filter = { _id: new ObjectId(id) }
      const result = await taskCollection.findOne(filter)    
      res.send(result)
    })

    app.get('/viewtask', async(req, res) =>{
      const cursor = taskCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/users', async(req, res) =>{
      const userInfo = req.body 
      const result = await taskUsersCollection.insertOne(userInfo)
      res.send(result)
    })

    app.post('/addtask', async(req, res) =>{
      const taskInfo = req.body 
      const result = await taskCollection.insertOne(taskInfo)
      res.send(result)
    })

    app.delete('/viewtask/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await taskCollection.deleteOne(query)
      res.send(result)
  })


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Orbitask server is running....")
  })
  
  
  app.listen(port, () => {
    console.log(`Orbitask server is running on port ${port}`);
  })

