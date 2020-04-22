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
import { construct } from "ionicons/icons";
import GardenTasks from "../components/GardenTasks";

const Garden: React.FC = (props) => {
  const [taskAmount, setTaskAmount] = useState<Number>(1);
  const [tasks, setTasks] = useState<firebase.firestore.DocumentData[]>([]);

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
    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          <IonCol>
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
