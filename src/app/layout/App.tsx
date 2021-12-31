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

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
    console.log("handle Select ", id);
  };

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
        />
      </Container>
    </>
  );
}

export default App;
