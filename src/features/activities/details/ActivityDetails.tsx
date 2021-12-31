import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
}

const ActivityDetails = ({
  activity,
  cancelSelectActivity,
}: Props) => {
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
          basic
          color="blue"
          content="Edit"
        />
        <Button
          basic
          color="grey"
          content="Cancel"
          onClick={cancelSelectActivity}
        />
      </Button.Group>
    </Card>
  );
};

export default ActivityDetails;
