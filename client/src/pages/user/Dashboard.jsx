import React from "react";
import { Box } from "@mui/system";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@apollo/client';

import { QUERY_BAND_SHOWS } from "../../utils/queries";


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
  error: {
    color: "orange",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
};
export function Dashboard() {
// GET BAND SHOWS
const band = localStorage.getItem("band");
console.log(band)
 const { error, loading, data } = useQuery(QUERY_BAND_SHOWS, {
     variables: { band: band }
     });
     console.log(data)

  
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
            dashboard
          </h1>
          <div style={styles.background}>
            <p>To list upcoming gigs for specific band</p>
            
          </div>
          <div style={styles.container}>
            {error && <p style={styles.error}>engineer's had too many please try again</p>}
            {loading && <CircularProgress />}
          </div>
        </Box>
      </div>
    </div>
  );
}
