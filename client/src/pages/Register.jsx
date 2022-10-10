import React from "react";

import { Box } from "@mui/system";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontFamily: "Bungee Shade, cursive",
    textAlign: "center",
    textShadow: "2px 2px 4px black",
    fontSize: "2.5rem",
  },
  background: {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: 5,
  },
};
export function Register() {
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
            marginTop: 3,

            padding: 1.5,
          }}
        >
          <h3 style={styles.heading} className="heading">
            Register
          </h3>
          <div style={styles.background}>
            <p>dasdasfaadf</p>
          </div>
        </Box>
      </div>
    </div>
  );
}
