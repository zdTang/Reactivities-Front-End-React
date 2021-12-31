import React from "react";
import { Item, ItemMeta, Button, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Pros {
  activities: Activity[];
  selectActivity:(id:string)=>void;
}
const ActivityList = ({ activities, selectActivity }: Pros) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: any) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <ItemMeta>{activity.date}</ItemMeta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                ></Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
