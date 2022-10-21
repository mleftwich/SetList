import React from "react";
import { useState } from "react";

// COMPONENT IMPORTS
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Success from "@mui/icons-material/DoneAllOutlined";
// LOGIN IMPORTS
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  error: {
    color: "orange",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
  inputs: {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgb(255, 255, 255, 0.3)",
    borderRadius: 5,
    fontFamily: "Share Tech Mono, monospace",
  },
  button: {
    color: "white",
    margin: "1rem",
    fontFamily: "Agency FB, cursive",
  },
};

export function Login() {
  // DEFAULT VALUES
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

  // AUTHENTICATE LOGIN
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await login({
        variables: { ...formValues },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  if (Auth.loggedIn()) {
    return <Navigate to="/user" />;
  }

  // LOGIN PAGE
  return (
    <div className="fade">
      {/* CONTAINER */}
      <div style={styles.container}>
        <Box
          sx={{
            width: { xs: 400, sm: 500, md: 700, lg: 900, xl: 1000 },
            backgroundColor: "rgb(0, 0, 0, 0.7)",
            borderRadius: 3,
            transition: "ease in",
            margin: 1,

            padding: 1.5,
          }}
        >
          {/* HEADING */}
          <h1 style={styles.heading} className="heading">
            login
          </h1>

          <div style={styles.container}>
            <div style={styles.background}>
              {error && <p style={styles.error}>fail</p>}

              {/* EMAIL FIELD  */}
              <h4 style={styles.labels}>email:</h4>
              <Input
                id="email-input"
                required
                name="email"
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
                style={styles.inputs}
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                color="primary"
              />

              {/* PASSWORD FIELD  */}
              <h4 style={styles.labels}>password:</h4>
              <Input
                id="password"
                required
                name="password"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                style={styles.inputs}
              />
              <div style={styles.container}>
                {/* BUTTON FIELD */}
                <Button
                  variant="outlined"
                  style={styles.button}
                  onClick={() => handleFormSubmit()}
                >
                  <b>login</b>
                </Button>
              </div>
              <div style={styles.container}>{data && <Success />}</div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
