/*========================================
This store is for MobX to maintain states
========================================== */
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";
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
    this.selectedActivity = this.activities.find((x) => x.id === id);
    console.log("SelectActivity= ", id);
  };

  // Two locations will call this method.
  // when use "Create Activity" on Navbar, no id passed here, will trigger "handleCancelActivity"
  // when use "View"=>"Edit" to trigger this method, will have id , will execute "handleSelectActivity"
  openForm = (id?: string) => {
    console.log("handleFormOpen=", id);
    id ? this.selectActivity(id) : this.cancelSelectActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = (activity: Activity) => {
    this.loading = true;

    /*==========================================
    Here are two operations:
    1. call Axios Api (Post) to add a new Activity to remote database.
    2. After adding new Activity to remote database, we don't load new updated database again
    instead, we operate the old data collection in the Memory(State)
    3. this approach ignore the return value of Axios.POST(), it has a return value, we just don't use it.
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      this.activities = [...this.activities, activity];
      this.selectedActivity = activity;
      this.editMode = false;
      this.loading = false;
    });
  };

  updateActivity = (activity: Activity) => {
    console.log("EditActivity: ", activity);
    /*==========================================
    Here are two operations:
    1. update remote database with Axios.
    2. After update remote database, we don't load new updated database again
    instead, we operate the database in the Memory(State)
    3. this approach ignore the return value of Axios.Put()
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */

    agent.Activities.update(activity).then(() => {
      this.activities = [
        ...this.activities.filter((x: Activity) => x.id !== activity.id),
        activity,
      ];
      this.selectedActivity = activity;
      this.editMode = false;
      this.loading = false;
    });
  };

  /*==========================================
    Here are two operations:
    1. call Axios Api (Delete) to remove a given Activity from remote database.
    2. After adding new Activity to remote database, we don't load new updated database again
    instead, we operate the old data collection in the Memory(State)
    3. this approach ignore the return value of Axios.POST(), it has a return value, we just don't use it.
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */
  deleteActivity = (id: string) => {
    this.loading = true;
    agent.Activities.delete(id).then(() => {
      this.activities = [...this.activities.filter((x) => x.id !== id)];
      this.loading = false;
    });
  };
}
