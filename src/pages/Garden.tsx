import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonIcon,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./Garden.css";
import { firebase } from "../Utility/Firebase";
import { construct, alert } from "ionicons/icons";
import GardenTasks from "../components/GardenTasks";

const Garden: React.FC = (props) => {
  const [taskAmount, setTaskAmount] = useState<Number>(1);
  const [tasks, setTasks] = useState<firebase.firestore.DocumentData[]>([]);
  const [showFrostCard, setShowFrostCard] = useState<boolean>(false);
  const [showWindCard, setShowWindCard] = useState<boolean>(false);
  const APICall = 'https://api.openweathermap.org/data/2.5/onecall?lat=57.02&lon=9.97&units=metric&appid=2979ef06a8fd8560f008aabb2bba0406'
  const MIN_TEMP = 0;
  const MAX_WIND_SPEED = 14;

  // onsnapshot == live updates

  // TODO: Ret således at den kun tager dem med som ikke er "taken" i DB
  useEffect(() => {
    const unsub = firebase.getTasks().onSnapshot((snapshot) => {
      //setTaskAmount(snapshot.size);
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapshot.forEach((doc) => {
        tempArray = [...tempArray, doc.data()];
      });

      let availableTasks: number;
      availableTasks = 0;
      tempArray.forEach((task) => {
        if (task.taskTaken === false) {
          availableTasks += 1;
        }
      });
      setTaskAmount(availableTasks);
      setTasks(tempArray);
    });

    fetch(APICall)
      .then(res => res.json())
      .then(result => {
        result.hourly.forEach((hour: { temp: number; wind_speed: number; }) => {
          if (hour.temp < MIN_TEMP) {
            setShowFrostCard(true);
          }

          if (hour.wind_speed > MAX_WIND_SPEED) {
            setShowWindCard(true);
          }
        })
      });
  
    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonGrid>
        <IonRow className='grid'>
          {showFrostCard ?
            <IonCol className='col'>
              <IonCard className='alert-card'>
                <IonCardHeader className='alert-icon'>
                  <IonIcon className='icon' icon={alert} />
                </IonCardHeader>
                <IonCardContent className='alert-text'>
                  <IonCardSubtitle>
                    We will experience frost degrees during the coming two days. Please cover garden boxes with frost intolerant vegetables.
                  </IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          : null}
          {showWindCard ?
            <IonCol className='col'>
              <IonCard className='alert-card'>
                <IonCardHeader className='alert-icon'>
                  <IonIcon className='icon' icon={alert} />
                </IonCardHeader>
                <IonCardContent className='alert-text'>
                  <IonCardSubtitle>
                    We will experience high wind during the coming two days. Please cover garden boxes with fragile vegetables.
                  </IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </IonCol>
          : null}
          <IonCol className='col'>
            <IonCard>
              <IonCardHeader className="card-div">
                <IonIcon className="icon" icon={construct}></IonIcon>
              </IonCardHeader>
              <IonCardContent className="card-div ion-no-margin ion-no-padding">
                <IonCardTitle>{taskAmount}</IonCardTitle>
              </IonCardContent>
              <IonCardContent className="card-div">
                <IonCardSubtitle>Available tasks in the garden</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <GardenTasks tasks={tasks} />
      </IonGrid>
    </IonPage>
  );
};

export default Garden;
