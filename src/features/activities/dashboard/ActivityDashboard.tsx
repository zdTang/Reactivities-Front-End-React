import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadingInitial, loadActivities, activityRegistry } = activityStore;

  // study this useEffect
  // any change in activityStore, will reload
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities(); // if the collection is still in Memory, don't load it from DB
  }, [activityStore, loadActivities]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Filter</h2>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);
