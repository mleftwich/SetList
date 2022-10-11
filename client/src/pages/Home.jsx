import React from "react";
import { Box } from "@mui/system";
// IMPORT COMPONENTS
import { Login } from "./Login";
import { Register } from "./Register";
import { Gigs } from "./Gigs";
// NAV IMPORTS
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";

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
export function Home() {
  const [value, setValue] = useState("recents");
  const [currentPage, setCurrentPage] = useState("Gigs");
  const handlePageChange = (page) => setCurrentPage(page);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // FUNCTION TO RENDER CURRENT PAGE FROM HANDLE EVENTS
  const renderPage = () => {
    if (currentPage === "Gigs") {
      return <Gigs />;
    } else if (currentPage === "Login") {
      return <Login />;
    } else if (currentPage === "Register") {
      return <Register />;
    }
  };
  return (
    <div>
      <div style={styles.container}>
        <BottomNavigation
          sx={{
            width: { xs: 370, sm: 450, md: 500, lg: 595, xl: 670 },
            borderRadius: 3,
            "& .MuiBottomNavigationAction-label": {
              fontFamily: "Share Tech Mono, sans-serif",
              fontSize: "1rem",
              color: "rgba(255, 255, 255)",
            },
            backgroundColor: "rgb(0, 0, 0, 0.7)",
            margin: "1rem",
            color: "white",
          }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="Gigs"
            icon={<HomeIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Gigs")}
          />
          <BottomNavigationAction
            label="Login"
            value="Login"
            icon={<LoginIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Login")}
          />
          <BottomNavigationAction
            label="Register"
            value="Register"
            icon={<PersonAddIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Register")}
          />
        </BottomNavigation>
      </div>
      <div style={styles.container}>
        <Box
          sx={{
            width: { xs: 330, sm: 300, md: 700, lg: 900, xl: 1000 },
            backgroundColor: "rgb(0, 0, 0, 0.7)",
            borderRadius: 3,
            transition: "ease in",
            margin: 1,
            marginTop: 3,

            padding: 1.5,
          }}
        >
          <h1 style={styles.heading} className="heading">
            The Setlist
          </h1>

          {renderPage()}
        </Box>
      </div>
    </div>
  );
}
