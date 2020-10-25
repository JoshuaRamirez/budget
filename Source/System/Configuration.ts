import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsoXCpRHrTtQqMid9ZbrSOzKIb9ypc3R0",
  appId: "budget-app-2048",
  authDomain: "budget-app-2048.firebaseapp.com",
  databaseURL: "https://budget-app-2048.firebaseio.com",
  projectId: "budget-app-2048"
};

export interface IConfiguration {
  Firebase: {
    Enabled: boolean;
    App: firebase.app.App;
    Firestore: firebase.firestore.Firestore;
  };
}

export class Configuration implements IConfiguration {
  public static Configuration: IConfiguration;
  public static Create(): IConfiguration {
    const configuration = new Configuration();
    // configuration.Firebase.App = firebase.initializeApp(firebaseConfig);
    // configuration.Firebase.Firestore = firebase.firestore();
    this.Configuration = configuration;
    return configuration;
  }
  public Firebase = {
    App: undefined,
    Enabled: true,
    Firestore: undefined,
    Storage: undefined
  };
}
