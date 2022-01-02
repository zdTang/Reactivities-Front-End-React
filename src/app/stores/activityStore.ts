/*========================================
This store is for MobX to maintain states
========================================== */
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

// this is a class, a component ??
export default class ActivityStore {
  constructor() {
    makeAutoObservable(this); // make this state abservable
  }

  //  use an Action as a property !!!
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  // Transform those useState here
  //activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  loading: boolean = false;
  loadingInitial = true;
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
        runInAction(() => {
          this.activityRegistry.set(activity.id, activity);
        });
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

  // use async syntax now
  /*==========================================
    Here are two operations:
    1. call Axios Api (Post) to add a new Activity to remote database.
    2. After adding new Activity to remote database, we don't load new updated database again
    instead, we operate the old data collection in the Memory(State)
    3. this approach ignore the return value of Axios.POST(), it has a return value, we just don't use it.
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */
  createActivity = async (activity: Activity) => {
    runInAction(() => {
      this.loading = true;
    });
    console.log("createActivity: ", activity);
    try {
      await agent.Activities.create(activity);
      // State cannot be assigned value with "=", should use method
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  /*==========================================
    Here are two operations:
    1. update remote database with Axios.
    2. After update remote database, we don't load new updated database again
    instead, we operate the database in the Memory(State)
    3. this approach ignore the return value of Axios.Put()
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */

  updateActivity = async (activity: Activity) => {
    console.log("updateActivity: ", activity);
    try {
      await agent.Activities.update(activity);
      // State cannot be assigned value with "=", should use method
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  /*==========================================
    Here are two operations:
    1. call Axios Api (Delete) to remove a given Activity from remote database.
    2. After adding new Activity to remote database, we don't load new updated database again
    instead, we operate the old data collection in the Memory(State)
    3. this approach ignore the return value of Axios.POST(), it has a return value, we just don't use it.
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */

  deleteActivity = async (id: string) => {
    runInAction(() => {
      this.loading = true;
    });
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
      });
      // cancel "view" the Activity if it is deleted
      // there is a scenario: the activity is Viewed on the right side while we click "delete" on it in the ActivityList
      // In this scenario, we will not display it any more.
      // as we use Router, we will view it in an individual view. so the previous scenario will not happen.
      runInAction(() => {
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  // Check if activity exists in Memory
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      // load from Memory
      this.selectedActivity = activity;
      return activity;
    } else {
      // load from Remote server
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };
}
