import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

// use Alias here, as we want use the "activity" in useState
// So that we can name the following "activity" as another name to avoid duplication
// activity:selectedActivity, Here, it is not a type or option value, it is an Alias
const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    loading,
    createActivity,
    updateActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const initialState = {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  // this activity is bind Form
  const [activity, setActivity] = useState(initialState);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  /*=============================================
  Be aware: The activity object comes from Form, which maintained by useState and 
  is initialized by an old Activity(Edit Mode) or empty Activity(Create Mode)
  for Edit Mode, the old Activity is passed here but its GUID will not display on the From as we 
  are not allowed to edit its GUID.
  
  //createActivity, updateActivity are Promises.
  ============================================== */
  const handleSubmit = () => {
    if (!activity.id) {
      // for new create Object, id is '', it should be falsy
      let newActivity = {
        ...activity,
        id: uuid(),
      };

      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  //this is a new approach to bind Form with an Object
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target; // "name" and "value" are properties of "event.target"
    setActivity({ ...activity, [name]: value }); // use new property to cover old value
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

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
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
