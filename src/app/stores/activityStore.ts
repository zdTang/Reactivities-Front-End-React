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

  loadActivities = async () => {
    // Reference the "agent" module
    // here the "response" is the "response.data"
    this.setLoadingInitial(true);
    try {
      var response = await agent.Activities.list();

      response.forEach((activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity); 
        // here, the activities use push to change state, no problem
      });
      this.setLoadingInitial(false);

      console.log("App-useEffect-Get-Activities-Axios: ", response);
    } catch (error) {
      console.log(error);

      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  constructor() {
    makeAutoObservable(this); // make this state abservable
  }
}
