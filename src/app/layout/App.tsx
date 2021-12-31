import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        console.log(response);
        setActivities(response.data);
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
    console.log("handle Select ", id);
  };
 // SelectedActivity is the Activity user chose from the ActivityList
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </>
  );
}

export default App;
