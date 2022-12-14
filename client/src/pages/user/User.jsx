import React, { useEffect } from "react";
import { Box } from "@mui/system";
// AUTH IMPORTS
import Auth from "../../utils/auth";
// COMPONENT IMPORTS
import Dashboard from "./Dashboard";
import { Gigs } from "../Gigs";
import { Loggedout } from "./Logout";
import { Add } from "./Add";
import { Profile } from "./Profile";
// NAV IMPORTS
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { useNavigate } from "react-router-dom";

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
export const User = () => {

    // LAZY QUERY TO GET USER
    const [getUser, { error: err, loading, data } ]= useLazyQuery(QUERY_USER);

  // STATE VALUES
  const [value, setValue] = useState("recents");
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const handlePageChange = (page) => setCurrentPage(page);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate()
  
  // ON MOUNT CHECK IF LOGGED IN AND EITHER RETURN HOME OR PROCEED WITH RENDERING DASHBOARD
  useEffect(() => {
      if(!Auth.loggedIn()){
        return navigate('/')
      }
      getUser({
        variables: { _id: Auth.getProfile().data._id },
      })
     
    }, [getUser, navigate])


    // SET BAND NAME IN LOCAL STORAGE
  const band = data?.user.name;
  localStorage.setItem("band", band);


  // FUNCTION TO RENDER CURRENT PAGE FROM HANDLE EVENTS
  const renderPage = () => {
    if (currentPage === "Dashboard") {
      return <Dashboard />;
    } else if (currentPage === "Home") {
      return <Gigs />;
    } else if (currentPage === "Logout") {
      return <Loggedout />;
    } else if (currentPage === "Add") {
      return <Add />;
    } else if (currentPage === "Profile") {
      return <Profile />;
    }
  };

 
  return (
    <div className="fade">
      <div style={styles.container}>
        <BottomNavigation
          sx={{
            width: { xs: 360, sm: 450, md: 500, lg: 595, xl: 670 },
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
            label="Profile"
            value="Profile"
            icon={<AccountIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Profile")}
          />
          <BottomNavigationAction
            label="Add"
            value="Add"
            icon={<AddBoxIcon style={{ color: "white" }} />}
            onClick={() => handlePageChange("Add")}
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
            width: { xs: 390, sm: 400, md: 700, lg: 900, xl: 1000 },
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
      <div style={styles.container}>
        {err && (
          <p style={styles.error}>engineer's had too many please try again</p>
        )}
        {loading && <CircularProgress />}
      </div>
    </div>
  );
};
