import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import {useStore} from "../../../app/stores/store"
interface Props {
  activity: Activity | undefined;
  
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}
// use Alias here, as we want use the "activity" in useState
// So that we can name the following "activity" as another name to avoid duplication
// activity:selectedActivity, Here, it is not a type or option value, it is an Alias
const ActivityForm = ({
  activity: selectedActivity,
  
  createOrEdit,
  submitting,
}: Props) => {
  
  const {activityStore}=useStore();
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    console.log("handleSubmit: ", activity);
    createOrEdit(activity);
  }

  //this is a new approach to bind Form with an Object
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target; // "name" and "value" are properties of "event.target"
    setActivity({ ...activity, [name]: value }); // use new property to cover old value
  }

  return (
    // "clearing" to clear previous float content?
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={activityStore.closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
