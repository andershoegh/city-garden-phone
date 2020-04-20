import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import EventRepeater from '../components/EventRepeater';
import { firebase } from '../Utility/Firebase';
import './Events.css';

const Events: React.FC = () => {
  const [events, setEvents] = useState<firebase.firestore.DocumentData[]>([]);
  
  useEffect(() => {
    const unsub = firebase.getEvents().onSnapshot(snapShot => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapShot.forEach(doc => {
        tempArray = [...tempArray, {...doc.data(), id: doc.id}];
      });
      setEvents(tempArray);
    });

    return () => {
      unsub();
    }
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EventRepeater events={events} />
      </IonContent>
    </IonPage>
  );
};

export default Events;
