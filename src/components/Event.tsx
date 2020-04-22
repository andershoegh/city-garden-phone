import React, { useState } from 'react';
import { timeOutline, personOutline } from 'ionicons/icons';
import { 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonList, 
  IonButton, 
  IonModal 
} from '@ionic/react';
import EventSignUp from './EventSignUp';

interface EventProps {
  event: firebase.firestore.DocumentData;
}

export const Event: React.FC<EventProps> = props => {
  const { event } = props;
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const date = Intl.DateTimeFormat('en-GB', {day: 'numeric', month: 'numeric'}).format(event.startTime.toDate());
  const startTime = Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(event.startTime.toDate());
  const endTime = Intl.DateTimeFormat('en-GB', {hour: '2-digit', minute: '2-digit'}).format(event.endTime.toDate());

  const attendees = event.attendees.sort((a: string, b: string) => {
    if(a.toLowerCase() < b.toLowerCase()) { return -1; };
    if(a.toLowerCase() > b.toLowerCase()) { return 1; };
    return 0;
  })

  return (
    <>
      <IonModal isOpen={openSignUp}>
        <EventSignUp event={event.title} id={event.id} closeModal={() => setOpenSignUp(false)} />
      </IonModal>
      <IonCard className='event-card'>
        <IonCardContent>
          <div>
            <h1>{event.title}</h1>
            <div className='date'>
              <IonIcon icon={timeOutline} slot='start' className='date-icon' />
              <span>
                {date} <br />
                {startTime} - {endTime}
              </span>
            </div>
            <div className='description'>{event.description}</div>
            <div className='attendees'>
              <IonIcon icon={personOutline} slot='start' className='attendee-icon' />
              <span>Attendees</span>
            </div>
            <IonList className='event-list'>
              {attendees.length !== 0 ?
                attendees.map((attendee: string, index: number) => (
                  <div key={index} className='event-list-item'>
                    {attendee}
                  </div>
                ))
              :
              <div className='event-list-item'>No on has signed up to attend this event yet</div>}
            </IonList>
            <div className='sign-up-btn'>
              <IonButton size='small' onClick={() => setOpenSignUp(true)}>
                  Sign up
              </IonButton>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
}

export default Event;