import React from "react";
import { Grid, Header, Image, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import firebase from "../../../server/firebase";
import Logo from "../../../assets/images/FlabbyChatLogo.png";

import "./UserInfo.css";

const UserInfo = (props) => {
  const getDropDownOptions = () => {
    return [
      {
        key: "signout",
        text: <span onClick={signOut}>Sign Out</span>,
      },
    ];
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("user signed out"));
  };

  if (props.user) {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row className="userinfo_grid_row">
            <Header>
              <Header.Content className="logo">
                <img src={Logo} alt="" />
                <span style={{ color: "#5271FF" }}>Flabby</span>
                <span style={{ color: "#00C9FF" }}>Chat</span>
              </Header.Content>
            </Header>
            <hr />
            <Header className="userinfo_displayname" inverted as="h4">
              <Dropdown
                className="displayname_box"
                trigger={
                  <span>
                    <Image src={props.user.photoURL} avatar className="img_box"></Image>
                    <span className="name_box">{props.user.displayName}</span>
                  </span>
                }
                options={getDropDownOptions()}
              ></Dropdown>
            </Header>
            <hr />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(UserInfo);
