import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonIcon,
  IonItem,
  IonRow,
  IonCard,
  IonCardSubtitle,
  IonCol,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonText,
} from "@ionic/react";
import "./Tab1.css";
import { firebase } from "../Utility/Firebase";
import { construct, trashOutline } from "ionicons/icons";

const Tab1: React.FC = (props) => {
  const [taskAmount, setTaskAmount] = useState<Number>(1);

  // onsnapshot == live updates
  useEffect(() => {
    const unsub = firebase.getTasks().onSnapshot((snapshot) => {
      setTaskAmount(snapshot.size);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <IonPage>
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
    </IonPage>
  );
};

export default Tab1;
