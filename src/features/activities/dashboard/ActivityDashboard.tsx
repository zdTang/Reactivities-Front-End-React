import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import {useStore} from "../../../app/stores/store"
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode, loadingInitial } = activityStore;
  
  // study this useEffect
  // any change in activityStore, will reload 
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);


  if (loadingInitial) return <LoadingComponent content="Loading app" />;
  // SelectedActivity is the Activity user chose from the ActivityList
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && <ActivityDetails />}
          {editMode && <ActivityForm />}
        </Grid.Column>
      </Grid>
    </div>
  );
};;

export default observer(ActivityDashboard);
