const express = require('express')
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.68x3u.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
     
         await client.connect();
         const scheduleCollection = client.db('doctors_portal').collection('schedule');
         app.get('/schedule' ,async(req,res)=>{
             const query = {}
             const cursor = scheduleCollection.find(query);
             const schedule = await cursor.toArray();
             res.send(schedule);
         })



        
    }

    finally{

    }

}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})