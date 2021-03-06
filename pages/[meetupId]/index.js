import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient,ObjectId} from 'mongodb';

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths(){
  const client = await MongoClient.connect('mongodb+srv://rushikesh9811:ScareCrow9811@cluster0.yqj7ceg.mongodb.net/meetups?retryWrites=true&w=majority')
    const db =client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups=await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();
  return{
    fallback:'blocking',
    paths:
    meetups.map(meetup=>({
      params:{meetupId:meetup._id.toString() },
  })),
  };
} 

export async function  getStaticProps(context){

  const meetupId =context.params.meetupId;
  
  const client = await MongoClient.connect('mongodb+srv://rushikesh9811:ScareCrow9811@cluster0.yqj7ceg.mongodb.net/meetups?retryWrites=true&w=majority')
  const db =client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup=await meetupsCollection.findOne({_id: ObjectId(meetupId)});
  client.close();
  return {
      props:{
        meetupData:{
          id:selectedMeetup._id.toString(),
          image:selectedMeetup.image,
          title:selectedMeetup.title,
          description:selectedMeetup.description,
          address:selectedMeetup.address,
        }
      }
  }
}

export default MeetupDetails;
