const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express()
const port =process.env.PORT ||5000;


// middle wares 
app.use(cors());
app.use(express.json());
 console.log(process.env.DB_USER);
 console.log(process.env.DB_PASSWORD);
// ooB7G0KVRk7BbeJT advoza 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eqsz8o8.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
      const serviceCollection = client.db('advoza').collection('services');
      // const orderCollection = client.db('advoza').collection('orders');

      // app.post('/jwt', (req, res) =>{
      //     const user = req.body;
      //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'})
      //     res.send({token})
      // })  

      app.get('/services', async (req, res) => {
          const query = {}
          const cursor = serviceCollection.find(query);
          const services = await cursor.toArray();
          res.send(services);
      });

      app.get('/services/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const service = await serviceCollection.findOne(query);
          res.send(service);
      });


      // orders api
      // app.get('/orders', verifyJWT, async (req, res) => {
      //     const decoded = req.decoded;
          
      //     if(decoded.email !== req.query.email){
      //         res.status(403).send({message: 'unauthorized access'})
      //     }

      //     let query = {};
      //     if (req.query.email) {
      //         query = {
      //             email: req.query.email
      //         }
      //     }
      //     const cursor = orderCollection.find(query);
      //     const orders = await cursor.toArray();
      //     res.send(orders);
      // });

      // app.post('/orders', verifyJWT, async (req, res) => {
      //     const order = req.body;
      //     const result = await orderCollection.insertOne(order);
      //     res.send(result);
      // });

      // app.patch('/orders/:id', verifyJWT, async (req, res) => {
      //     const id = req.params.id;
      //     const status = req.body.status
      //     const query = { _id: ObjectId(id) }
      //     const updatedDoc = {
      //         $set:{
      //             status: status
      //         }
      //     }
      //     const result = await orderCollection.updateOne(query, updatedDoc);
      //     res.send(result);
      // })

      // app.delete('/orders/:id', verifyJWT, async (req, res) => {
      //     const id = req.params.id;
      //     const query = { _id: ObjectId(id) };
      //     const result = await orderCollection.deleteOne(query);
      //     res.send(result);
      // })


  }
  finally {

  }

}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})