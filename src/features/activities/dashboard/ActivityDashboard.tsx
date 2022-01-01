import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  
  selectedActivity: Activity | undefined;
 
  editMode: boolean;
  
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
const ActivityDashboard = ({
  activities,
  
  selectedActivity,
  
  editMode,
  createOrEdit,
  deleteActivity,
  submitting,
}: Props) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            
            deleteActivity={deleteActivity} 
            submitting={submitting}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetails
              activity={selectedActivity}
             
            />
          )}
          {editMode && (
            <ActivityForm
             
              activity={selectedActivity}
              createOrEdit={createOrEdit}
              submitting={submitting}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
