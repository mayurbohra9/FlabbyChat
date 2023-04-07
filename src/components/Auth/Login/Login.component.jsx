import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import firebase from "../../../server/firebase";
import Logo from "../../../assets/images/FlabbyChatLogo.png";
import "../Auth.css";

const Login = () => {
  let user = {
    email: "",
    password: "",
  };

  let errors = [];

  const [userState, setuserState] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, seterrorState] = useState(errors);

  const handleInput = (event) => {
    let target = event.target;
    setuserState((currentState) => {
      let currentuser = { ...currentState };
      currentuser[target.name] = target.value;
      return currentuser;
    });
  };

  const checkForm = () => {
    if (isFormEmpty()) {
      seterrorState((error) =>
        error.concat({ message: "Please fill in all fields" })
      );
      return false;
    }
    return true;
  };

  const isFormEmpty = () => {
    return !userState.password.length || !userState.email.length;
  };

  const formaterrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>);
  };

  const onSubmit = (event) => {
    seterrorState(() => []);
    if (checkForm()) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then((user) => {
          setIsLoading(false);
          console.log(user);
        })
        .catch((serverError) => {
          setIsLoading(false);
          seterrorState((error) => error.concat(serverError));
        });
    }
  };

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: "500px" }}>
        <h1>
          Welcome to <span style={{ color: "#5271FF" }}>Flabby</span>
          <span style={{ color: "#00C9FF" }}>Chat</span>
        </h1>
        <Form onSubmit={onSubmit}>
          <Segment stacked className="auth-form">
            <Header>
              <img src={Logo} alt="" />
              <span style={{ color: "#5271FF" }}>Log</span>
              <span style={{ color: "#00C9FF" }}>In</span>
            </Header>

            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
            <Button className="btn" disabled={isLoading} loading={isLoading}>
              Login
            </Button>
            <p>
              Not an user ? &nbsp;
              <Link to="/register">Signup</Link>
            </p>
          </Segment>
        </Form>
        {errorState.length > 0 && (
          <Message error>
            <h3>Errors</h3>
            {formaterrors()}
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
