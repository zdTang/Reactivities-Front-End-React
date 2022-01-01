import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

const NavBar = () => {
  const { activityStore } = useStore();
  const { openForm } = activityStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            onClick={() => openForm()}  // not just openForm
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
