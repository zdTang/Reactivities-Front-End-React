import React, { useEffect } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
  } = activityStore;
  
   const { id } = useParams<{ id: string }>();

   useEffect(() => {
     if (id) loadActivity(id);
   }, [id, loadActivity]);
   
   

  if (loadingInitial || !activity) return <LoadingComponent />;

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
        />
      </Button.Group>
    </Card>
  );
};

export default observer(ActivityDetails);
