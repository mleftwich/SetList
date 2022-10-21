import React from "react";
import { useState } from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
// GRAPHQL IMPORTS
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    color: "white",
    fontFamily: "Share Tech Mono, cursive",
    textAlign: "center",
    textShadow: "2px 2px 4px black",
  },
  background: {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "3rem",
    borderRadius: 5,
    width: "50%",
  },
  labels: {
    color: "white",
    fontFamily: "PT Mono, cursive",
  },
  text: {
    color: "white",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
  inputs: {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgb(255, 255, 255, 0.3)",
    borderRadius: 5,
    fontFamily: "Share Tech Mono, monospace",
    width: "100%",
  },
  button: {
    color: "white",
    margin: "1rem",
    fontFamily: "Agency FB, cursive",
  },
  error: {
    color: "orange",
    fontFamily: "Share Tech Mono, monospace",
    textAlign: "center",
  },
};

export function Register() {
  // ADD USER
  //state
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [confirm, setConfirm] = useState(false);
  // SUBMIT HANDLER
  const handleFormSubmit = async (event) => {
    if (formValues.password !== formValues.confirm) {
      return setConfirm(true);
    }
    try {
      const { data } = await addUser({
        variables: { ...formValues },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // FORM CONTROLLER
  const defaultValues = {
    email: "",
    password: "",
  };
  // STATE
  const [formValues, setFormValues] = useState(defaultValues);
  // EVENT HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // REGISTER PAGE
  return (
    <div className="fade">
      {/* CONTAINER */}
      <div style={styles.container}>
        <Box
          sx={{
            width: { xs: 500, sm: 500, md: 700, lg: 900, xl: 1000 },
            backgroundColor: "rgb(0, 0, 0, 0.7)",
            borderRadius: 3,
            transition: "ease in",
            margin: 1,

            padding: 1.5,
          }}
        >
          {/* HEADING */}
          <h1 style={styles.heading} className="heading">
            register
          </h1>

          <div style={styles.container}>
            <div style={styles.background}>
              {/* NAME FIELD  */}
              <h4 style={styles.labels}>name:</h4>
              <Input
                id="name-input"
                required
                name="name"
                type="text"
                placeholder="Band or act name"
                value={formValues.name}
                onChange={handleInputChange}
                style={styles.inputs}
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                color="primary"
              />

              {/* EMAIL FIELD  */}
              <h4 style={styles.labels}>email:</h4>
              <Input
                id="email"
                required
                name="email"
                placeholder="Email address"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* PASSWORD FIELD  */}
              <h4 style={styles.labels}>password:</h4>
              <Input
                id="password"
                required
                name="password"
                placeholder="min 7 chars"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              <h4 style={styles.labels}>confirm password:</h4>
              <Input
                id="confirm"
                required
                name="confirm"
                placeholder="min 7 chars"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="password"
                value={formValues.confirm}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* IMAGE FIELD  */}
              <h4 style={styles.labels}>image:</h4>
              <Input
                id="image"
                required
                name="image"
                placeholder="Link to an image"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.image}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* GENRE FIELD  */}
              <h4 style={styles.labels}>genre:</h4>
              <Input
                id="genre"
                required
                name="genre"
                placeholder="Genre"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.genre}
                onChange={handleInputChange}
                style={styles.inputs}
              />
              {/* ABOUT FIELD */}
              <h4 style={styles.labels}>about:</h4>
              <Input
                id="about"
                required
                name="about"
                placeholder="Use this space to tell everyone about your act - influences, what to expect from a show and links to socials"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.about}
                onChange={handleInputChange}
                style={styles.inputs}
                multiline={true}
                rows={5}
              />

              <div style={styles.container}>
                {/* BUTTON FIELD */}
                <Button
                  variant="outlined"
                  style={styles.button}
                  onClick={() => handleFormSubmit()}
                >
                  <b>register</b>
                </Button>
              </div>
              <div style={styles.container}>
                {data && <p style={styles.labels}>onward</p>}
                {error && (
                  <p style={styles.error}>engineer's had too many try again</p>
                )}
                {confirm && (
                  <p style={styles.error}>
                    shakey elvis - your password doesn't match
                  </p>
                )}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
