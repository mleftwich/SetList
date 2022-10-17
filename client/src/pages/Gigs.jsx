import React from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import { teal } from "@mui/material/colors"
import AddressIcon from '@mui/icons-material/Signpost';
import BandIcon from '@mui/icons-material/NoiseAware';
import DateIcon from '@mui/icons-material/EventNote';
import TimeIcon from '@mui/icons-material/HistoryToggleOff';
import CircularProgress from "@mui/material/CircularProgress";
// DATA IMPORTS
import { useQuery } from "@apollo/client";
import { QUERY_SHOWS } from "../utils/queries";

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
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginTop: '1px',
  },
  links: {
    color: blueGrey[400],
    fontFamily: "Share Tech Mono, monospace",
    textAlign: "center",
    textDecoration: "none",
  },
  text: {
    color: "white",
    fontFamily: "Share Tech Mono, monospace",
    marginLeft: ".5rem",
  },
  band: {
    color: teal[100],
    fontFamily: "PT Mono, monospace",
   
  },
  boxes: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    color: blueGrey[200],
    fontFamily: "Share Tech Mono, monospace",
    textAlign: "center",
    textDecoration: "none",
  },
};


export function Gigs() {
// GET SHOWS

const { loading, error, data, refetch } = useQuery(QUERY_SHOWS)
const res = [data?.allshows];
  const shows = res[0]
  refetch()
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
            featured
          </h1>
         <div>
         
         </div>
          {shows &&
            shows.map((shows) => (
              <div style={styles.background} key={shows._id}>
                <div style={styles.boxes}>
                  <h4 style={styles.text}><DateIcon sx={{ color: blueGrey[400]}} /> {shows.date}</h4>
                  <h3 style={styles.band}><BandIcon sx={{ color: blueGrey[400]}} />|{shows.band}</h3>
                  <h4 style={styles.text}><AddressIcon sx={{ color: blueGrey[400]}} /> {shows.venue}</h4>
                  <h4 style={styles.text}><TimeIcon sx={{ color: blueGrey[400]}} /> {shows.start}</h4>
                  <h4 style={styles.text}>{shows.attending}</h4>
                  </div>
                  </div>
            ))}
         
         <div style={styles.container}>
            {error && (
              <p style={styles.error}>
                engineer's had too many please try again
              </p>
            )}
            {loading && <CircularProgress />}
            </div>
        </Box>
      </div>
    </div>
  );
}
