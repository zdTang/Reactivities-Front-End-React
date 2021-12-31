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
  selectedActivity:Activity | undefined;
}
const ActivityDashboard = ({
  activities,
  cancelSelectActivity,
  selectActivity,
  selectedActivity,
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
          {selectedActivity && (
            <ActivityDetails
              activity={selectedActivity}
              cancelSelectActivity={cancelSelectActivity}
            />
          )}
          <ActivityForm />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
