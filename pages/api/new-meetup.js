import {MongoClient} from 'mongodb';

async function handler(req, res){
if(req.method==="POST"){
    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://rushikeshsuryawanshi9811:vpg5ih2p546bq2Ko@cluster0.bzsnqqx.mongodb.net/meetups')
    const db =client.db();

    const meetupsCollection = db.collection('meetups');
    const result=await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();


    res.status(201).json({message:"meetup inserted!"});
}
}

export default handler
