import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  cancelSelectActivity: () => void;
  selectActivity: (id: string) => void;
  selectedActivity: Activity | undefined;
  openForm: (id: string) => void;
  editMode: boolean;
  closeForm: () => void;
}
const ActivityDashboard = ({
  activities,
  cancelSelectActivity,
  selectActivity,
  selectedActivity,
  openForm,
  closeForm,
  editMode
}: Props) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              activity={selectedActivity}
              cancelSelectActivity={cancelSelectActivity}
              openForm={openForm}
            />
          )}
          {editMode && (
            <ActivityForm closeForm={closeForm} activity={selectedActivity} />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
