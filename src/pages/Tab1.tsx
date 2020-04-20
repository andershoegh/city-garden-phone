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
import "./Tab1.css";
import { firebase } from "../Utility/Firebase";
import { construct } from "ionicons/icons";

const Tab1: React.FC = (props) => {
  const [taskAmount, setTaskAmount] = useState<Number>(1);
  const [tasksDoing, setTasksDoing] = useState<firebase.firestore.DocumentData[]>([]);

  // onsnapshot == live updates
  useEffect(() => {
    const unsub = firebase.getTasks().onSnapshot((snapshot) => {
      setTaskAmount(snapshot.size);
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapshot.forEach(doc => {
        tempArray = [...tempArray, doc.data()];
      });
      setTasksDoing(tempArray)
    });
    return () => {
      unsub();
    };
  }, []);

  let tasks: string[];
  tasks = [];
  tasksDoing.forEach(task => {
    if (!tasks.includes(task.taskTemplateId)) {
      tasks.push(task.taskTemplateId);
    }
  });

  let taskString = '';
  tasks.forEach((task, index) => {
    if (index < tasks.length - 2) {
      taskString += task + ', ';
    } else if (index === tasks.length - 2) {
      taskString += task + ' and ';
    } else {
      taskString += task;
    }
  })

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
          {tasksDoing.length ? (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <span>
                      Right now, people are {taskString} in the garden.
                    </span>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ) : null}
      </IonGrid>
    </IonPage>
  );
};

export default Tab1;
