import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/activities/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";

function App() {
  const { activityStore } = useStore();
  const { loadingInitial } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;
  // SelectedActivity is the Activity user chose from the ActivityList
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route exact path="/createActivity" component={ActivityForm} />
      </Container>
    </>
  );
}
// must use "observer" or the state cannot be updated.
export default observer(App);
