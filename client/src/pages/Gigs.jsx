import React from "react";
import { Box } from "@mui/system";
import { blueGrey } from "@mui/material/colors";

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
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: 5,
    marginTop: '1px'
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
  boxes: {
    display: "flex",
    justifyContent: "space-around",
    width: '100%',
  },
};


export function Gigs() {
// GET SHOWS

const { loading, error, data } = useQuery(QUERY_SHOWS)
const res = [data?.allshows];
  const shows = res[0]
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
          <h4 style={styles.links}>date/band/venue/start</h4>
         </div>
          {shows &&
            shows.map((shows) => (
              <div style={styles.background} key={shows._id}>
                <div style={styles.boxes}>
                  <h4 style={styles.text}>{shows.date}</h4>
                  <h4 style={styles.links}>{shows.band}</h4>
                  <h4 style={styles.text}>{shows.venue}</h4>
                  <h4 style={styles.text}>{shows.start}</h4>
                  <h4 style={styles.text}>{shows.attending}</h4>
                  </div>
                  </div>
            ))}
         
        </Box>
      </div>
    </div>
  );
}
