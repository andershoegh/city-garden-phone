import app from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";

class Firebase {
  db: firebase.firestore.Firestore;
  firestore: any;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
    this.firestore = app.firestore;
  }

  getBed = () => this.db.collection("gardenBox");

  getTypes = () => firebase;

  getNotes = () =>
    this.db
      .collection("notes")
      .orderBy("pinned", "desc")
      .orderBy("created", "desc");

  getTasks = () => this.db.collection("alltasks").orderBy("gardenBoxId", "asc");

  getTaskDescription = () => this.db.collection("taskTemplate");

  getEvents = () => this.db.collection('events').orderBy('startTime', 'asc');

  eventSignUp = (id: string, name: string) =>
    this.db
    .collection('events')
    .doc(id)
    .update( {
      attendees: firebase.firestore.FieldValue.arrayUnion(name)
    });
}
export const firebase = new Firebase();
