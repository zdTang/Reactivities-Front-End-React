import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";

interface Props {
  activities: Activity[];
}
const ActivityDashboard = ({ activities }: Props) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <List>
            {activities.map((activity: any) => (
              <List.Item key={activity.id}>{activity.title}</List.Item>
            ))}
          </List>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
