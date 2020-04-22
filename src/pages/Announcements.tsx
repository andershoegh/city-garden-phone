import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonText,
  IonCardSubtitle,
  IonRow,
  IonGrid,
  IonCol,
} from "@ionic/react";
import "./Announcements.css";
import { firebase } from "../Utility/Firebase";

const Announcements: React.FC = () => {
  const [notes, setNotes] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    const unsub = firebase.getNotes().onSnapshot((snapshot) => {
      let tempArray: firebase.firestore.DocumentData[];
      tempArray = [];
      snapshot.forEach((doc) => {
        tempArray = [...tempArray, { ...doc.data(), id: doc.id }];
      });
      setNotes(tempArray);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <IonPage>
      <IonGrid>
        <IonRow>
          {notes.length ? (
            notes.map((note) =>
              note.pinned ? (
                <IonCol size="12">
                  <IonCard>
                    <IonCardContent>
                      <div className="card-div">
                        <IonText className="ion-padding">{note.note}</IonText>
                      </div>
                      <IonCardSubtitle>{note.author}</IonCardSubtitle>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ) : null
            )
          ) : (
            <div></div>
          )}
        </IonRow>
      </IonGrid>
    </IonPage>
  );
};

export default Announcements;
