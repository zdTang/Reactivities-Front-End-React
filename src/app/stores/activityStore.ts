/*========================================
This store is for MobX to maintain states
========================================== */
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

// this is a class, a component ??
export default class ActivityStore {
  title = "Hello from MobX"; // this is a state
  setTitle = () => {
    this.title = this.title + "!";
  };
  // Transform those useState here
  activities: Activity[] = [];
  loading: boolean = false;
  loadingInitial = false;
  selectedActivity: Activity | null = null;
  editMode = false;

  loadActivities = () => {
    // Reference the "agent" module
    // here the "response" is the "response.data"
    this.loadingInitial = true;
    agent.Activities.list().then((response) => {
      // the date string from ASP.NET core API is very long
      // use the following code to just get the YEAR-MONTH-DAY
      // and ignore the Time
      response.forEach((activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
      this.loadingInitial = false;
      console.log("App-useEffect-Get-Activities-Axios: ", response);
    });
  };

  constructor() {
    makeAutoObservable(this); // make this state abservable
  }
}
