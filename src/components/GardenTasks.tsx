import React from 'react';
import { IonCol, IonRow, IonCard, IonCardContent } from '@ionic/react';

interface GardenTasksProps {
  tasks: firebase.firestore.DocumentData[];
}

const GardenTasks: React.FC<GardenTasksProps> = props => {
  const { tasks } = props;
  
  let tasksDoing: string[];
  tasksDoing = [];
  tasks.forEach(task => {
    if (!tasksDoing.includes(task.taskTemplateId)) {
      tasksDoing.push(task.taskTemplateId);
    }
  });

  let taskString = '';
  tasksDoing.forEach((task, index) => {
    if (index < tasksDoing.length - 2) {
      taskString += task + ', ';
    } else if (index === tasksDoing.length - 2) {
      taskString += task + ' and ';
    } else {
      taskString += task;
    }
  })

  return (
    <>
      {tasksDoing.length !== 0 ? 
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
      : null }
    </>
  );
}

export default GardenTasks;