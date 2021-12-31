import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Reference the "agent" module
    // here the "response" is the "response.data"
    agent.Activities.list().then((response) => {
        let activities: Activity[] = [];
        // the date string from ASP.NET core API is very long 
        // use the following code to just get the YEAR-MONTH-DAY
        // and ignore the Time
        response.forEach((activity: Activity) => {
          activity.date = activity.date.split("T")[0];
          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
      console.log("App-useEffect-Get-Activities-Axios: ", response);
    });
  }, []);

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
    console.log("handleCreateOrEditActivity: ", activity);
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id), // if activity has 'id",means it is edit an old Activity
          activity, // delete the old Activity based on "id" and append a new one
        ]) // if it is new created Activity, then goes here !
      : setActivities([...activities, { ...activity, id: uuid() }]); // cover the empty id with "uuid", very smart approach !
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };
  
  if (loading) return <LoadingComponent content="Loading app"/>;
  // SelectedActivity is the Activity user chose from the ActivityList
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
