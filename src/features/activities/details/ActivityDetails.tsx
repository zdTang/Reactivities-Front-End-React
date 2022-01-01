import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import {useStore} from "../../../app/stores/store"
interface Props {
  activity: Activity;
  
}

const ActivityDetails = ({
  activity,
  
}: Props) => {
  
  const {activityStore}=useStore();
  return (
    // "fluid" is necessary to match the Grid's width
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Button.Group widths={2}>
        <Button
          onClick={() => activityStore.openForm(activity.id)}
          basic
          color="blue"
          content="Edit"
        />
        <Button
          basic
          color="grey"
          content="Cancel"
          onClick={activityStore.cancelSelectActivity}
        />
      </Button.Group>
    </Card>
  );
};

export default ActivityDetails;
