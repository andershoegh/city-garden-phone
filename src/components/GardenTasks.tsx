import React from "react";
import {
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonCardSubtitle,
} from "@ionic/react";
import '../pages/Garden.css';
import { leafOutline } from "ionicons/icons";

interface GardenTasksProps {
  tasks: firebase.firestore.DocumentData[];
}

const GardenTasks: React.FC<GardenTasksProps> = (props) => {
  const { tasks } = props;

  let tasksDoing: string[];
  tasksDoing = [];
  tasks.forEach((task) => {
    if (!tasksDoing.includes(task.taskTemplateId)) {
      tasksDoing.push(task.taskTemplateId);
    }
  });

  return (
    <>
      {tasksDoing.length !== 0 ? (
        <IonRow>
          <IonCol className='col'>
            <IonCard>
              <IonCardHeader className="card-div">
                <IonIcon className="icon" icon={leafOutline}></IonIcon>
              </IonCardHeader>
              <IonCardContent className="card-div ion-no-margin ion-no-padding">
                <IonCardSubtitle>People are currently</IonCardSubtitle>
              </IonCardContent>
              <IonCardContent>
                <ul>
                  {tasksDoing.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      ) : null}
    </>
  );
};

export default GardenTasks;
