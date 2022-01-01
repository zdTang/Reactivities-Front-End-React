import React, { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
   const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
    console.log("click cancel!");
  };

  // ActivityList=>ActivityDashboard=>App  pass an ID here
  // Here use the ID to find the Activity and pass to ActivityDetail
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
    console.log("handleSelectActivity= ", id);
  };

  // Two locations will call this method.
  // when use "Create Activity" on Navbar, no id passed here, will trigger "handleCancelActivity"
  // when use "View"=>"Edit" to trigger this method, will have id , will execute "handleSelectActivity"
  const handleFormOpen = (id?: string) => {
    console.log("handleFormOpen=", id);
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    console.log("handleCreateOrEditActivity: ", activity);
    // if activity has 'id",means it is edit an old Activity
    /*==========================================
    Here are two operations:
    1. update remote database with Axios.
    2. After update remote database, we don't load new updated database again
    instead, we operate the database in the Memory(State)
    3. this approach ignore the return value of Axios.Put()
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        //console.log("after update: ", data);
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity, // delete the old Activity based on "id" and append a new one
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      // if it is new created Activity, then goes here !
      /*==========================================
    Here are two operations:
    1. call Axios Api (Post) to add a new Activity to remote database.
    2. After adding new Activity to remote database, we don't load new updated database again
    instead, we operate the old data collection in the Memory(State)
    3. this approach ignore the return value of Axios.POST(), it has a return value, we just don't use it.
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  };
  /*==========================================
    Here are two operations:
    1. call Axios Api (Delete) to remove a given Activity from remote database.
    2. After adding new Activity to remote database, we don't load new updated database again
    instead, we operate the old data collection in the Memory(State)
    3. this approach ignore the return value of Axios.POST(), it has a return value, we just don't use it.
    4. is this a classic approach? or we load the new data from remote Db after updating
    ============================================ */
  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  // SelectedActivity is the Activity user chose from the ActivityList
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <h1>{activityStore.title}</h1>
        <Button
          content="Add exclamation!"
          positive
          onClick={activityStore.setTitle}
        ></Button>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          activities={activityStore.activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}
// must use "observer" or the state cannot be updated.
export default observer(App);
