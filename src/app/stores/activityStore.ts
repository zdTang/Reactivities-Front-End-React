/*========================================
This store is for MobX to maintain states
========================================== */
import { makeAutoObservable, runInAction } from "mobx";
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
    this.loadingInitial = true;
    try {
      var response = await agent.Activities.list();
      runInAction(() => {
        response.forEach((activity: Activity) => {
          activity.date = activity.date.split("T")[0];
          this.activities.push(activity);
        });
        this.loadingInitial = false;
      });

      console.log("App-useEffect-Get-Activities-Axios: ", response);
    } catch (error) {
      console.log(error);
      runInAction(()=>{
        this.loadingInitial = false;
      })
    }
  };

  constructor() {
    makeAutoObservable(this); // make this state abservable
  }
}
