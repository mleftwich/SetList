import React from "react";
import { Box } from "@mui/system";
import Auth from '../../utils/auth';
import Button from "@mui/material/Button";
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
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
  button: {
    color: "white",
    margin: "1rem",
    fontFamily: "PT Mono, monospace",
  },
};
export function Loggedout() {
    if (Auth.loggedIn()) {
        Auth.logout()
        }
  return (
    <div>
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
          <h1 style={styles.heading} className="heading">
            logged out
          </h1>
          
            <p style={styles.text}>..be most excellent to each other</p>
            <div style={styles.container}>
                  <Button href="/" variant="outlined" style={styles.button}>
                    home
                  </Button>
                  </div>
        </Box>
      </div>
    </div>
  );
}
