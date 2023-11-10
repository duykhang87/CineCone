import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ActorService from '../../service/ActorService';
import './Actor.css'

export default function Actor() {
    const { id } = useParams();
    const [actor, setActor] = useState();
    const [followers,setFollowers] = useState();

    useEffect(() => {
        ActorService.getActorById(id)?.then((response) => {
          setActor(response.data);
          console.log(response);
        });
      }, [id]);
      
      useEffect(() => {
        if (actor && actor.users) { // Check if actor and actor.users are defined
          setFollowers(actor.users.length); // Fix the typo here
        }
      }, [actor]);
  return (
    <div  className='row actor'>
       <div className="col-4">
            <img className="img-fluid avata-img" 
                src="/anhbia.jpg" 
                alt="ảnh avata" 
            />
        </div>
        <div className="col-8">
        
      
        </div>
    </div>
  )
}
