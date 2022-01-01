import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import {useStore} from "../../../app/stores/store"
import { observer } from "mobx-react-lite";


const ActivityDashboard = () => {
  const {activityStore}=useStore();
  const { selectedActivity, editMode } = activityStore;
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList/>
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetails/>
          )}
          {editMode && <ActivityForm />}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ActivityDashboard);
