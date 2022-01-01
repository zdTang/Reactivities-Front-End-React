/*========================================
This store is for MobX to maintain states
========================================== */
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

// this is a class, a component ??
export default class ActivityStore {
  constructor() {
    makeAutoObservable(this); // make this state abservable
  }
  
  title = "Hello from MobX"; // this is a state
  setTitle = () => {
    this.title = this.title + "!";
  };
  // Transform those useState here
  activities: Activity[] = [];
  loading: boolean = false;
  loadingInitial = false;
  selectedActivity: Activity | undefined = undefined;
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

  cancelSelectActivity = () => {
    this.selectedActivity = undefined;
    console.log("CancelSelectActivity!");
  };


  selectActivity = (id: string) => {
    this.selectedActivity=this.activities.find((x) => x.id === id);
    console.log("SelectActivity= ", id);
  };

  // Two locations will call this method.
  // when use "Create Activity" on Navbar, no id passed here, will trigger "handleCancelActivity"
  // when use "View"=>"Edit" to trigger this method, will have id , will execute "handleSelectActivity"
  openForm = (id?: string) => {
    console.log("handleFormOpen=", id);
    id ? this.selectActivity(id) : this.cancelSelectActivity();
    this.editMode=true;
  };

  closeForm = () => {
   this.editMode = false;
  };
}
