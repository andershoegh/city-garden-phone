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
}
export const firebase = new Firebase();
