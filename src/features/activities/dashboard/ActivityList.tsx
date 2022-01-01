import React, { SyntheticEvent, useState } from "react";
import { Item, ItemMeta, Button, Segment, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import {useStore} from "../../../app/stores/store";
interface Pros {
  activities: Activity[];
 
  deleteActivity: (id: string) => void;
  submitting:boolean;
}
const ActivityList = ({
  activities,
 
  deleteActivity,
  submitting,
}: Pros) => {
  const {activityStore} = useStore();
    const [target, setTarget] = useState("");

    function handleActivityDelete(
      e: SyntheticEvent<HTMLButtonElement>,
      id: string
    ) {
      setTarget(e.currentTarget.name);
      deleteActivity(id);
    }
    
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
                  name={activity.id}
                  loading={submitting && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => activityStore.selectActivity(activity.id)}
                ></Button>
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
