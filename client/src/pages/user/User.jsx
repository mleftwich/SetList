import React from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
// AUTH IMPORTS
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
// COMPONENT IMPORTS
import { Dashboard } from "./Dashboard";
import { Gigs } from '../Gigs'
import { Loggedout } from './Logout'
// NAV IMPORTS
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from "@mui/icons-material/Logout";
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
  button: {
    color: "white",
    margin: "1rem",
    fontFamily: "PT Mono, monospace",
  },
  labels: {
    color: "white",
    fontFamily: "PT Mono, cursive",
    textAlign: "center",
  },
};
export function User() {
  const [value, setValue] = useState("recents");
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const handlePageChange = (page) => setCurrentPage(page);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // LOCK OUT NON USERS
  const { name: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { name: userParam },
  });
  const user = data?.user || {};

  

  // FUNCTION TO RENDER CURRENT PAGE FROM HANDLE EVENTS
  const renderPage = () => {
    if (currentPage === "Dashboard") {
      return <Dashboard />;
       } else if (currentPage === "Home") {
         return <Gigs />;
       } else if (currentPage === "Logout") {
         return <Loggedout />;
    }
  };

  if (Auth.loggedIn()) {
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
            value="Home"
            icon={<HomeIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Home")}
          />
          <BottomNavigationAction
            label="Dashboard"
            value="Dashboard"
            icon={<DashboardIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Dashboard")}
          />
          <BottomNavigationAction
            label="Logout"
            value="Logout"
            icon={<LogoutIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Logout")}
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
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (!user?.username) {
          return (
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
                <h1 style={styles.heading}>the setlist</h1>
                <h3 style={styles.labels}>
                  Oops! This is for users only. Click the link below to sign up or
                  login.
                </h3>
                <div style={styles.container}>
                  <Button href="/" variant="outlined" style={styles.button}>
                    home
                  </Button>
                </div>
              </Box>
            </div>
          );
        }
}
