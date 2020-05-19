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
  IonContent,
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
      <IonContent>
        <IonGrid>
          <IonRow>
            {notes.length ? (
              notes.map((note, index) =>
                note.pinned ? (
                  <IonCol key={index} size="12">
                    <IonCard className="announcementCard">
                      <IonCardContent className="ion-padding">
                        <div style={{ padding: "0 10px 15px 10px" }}>
                          <IonText>{note.note}</IonText>
                        </div>
                        <IonCardSubtitle>- {note.author}</IonCardSubtitle>
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
      </IonContent>
    </IonPage>
  );
};

export default Announcements;
