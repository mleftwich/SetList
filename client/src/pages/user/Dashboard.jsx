import React from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { blueGrey } from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';
// DATA IMPORTS
import { useQuery } from "@apollo/client";
import { QUERY_BAND_SHOWS } from "../../utils/queries";

// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxes: {
    display: "flex",
    justifyContent: "space-around",
    width: '100%',
  },
  heading: {
    color: "white",
    fontFamily: "Share Tech Mono, cursive",
    textAlign: "center",
    textShadow: "4px 4px 4px black",
  },
  background: {
    color: "white",
    border: "1px solid rgba(455, 455, 455, 0.4)",
    borderRadius: 5,
    width: 'auto',
    marginTop: '1px'
  },
  error: {
    color: "orange",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
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
  button: {
    color: "white",
    margin: "1rem",
    fontFamily: "PT Mono, monospace",
  },
};


export function Dashboard() {
  // GET BAND SHOWS
  const band = localStorage.getItem("band");
  const { error, loading, data } = useQuery(QUERY_BAND_SHOWS, {
    variables: { band: band },
  });
  const res = [data?.shows];
  const shows = res[0];

  return (
    <div>
      <div style={styles.container}>
        <Box
          sx={{
            width: { xs: 330, sm: 500, md: 700, lg: 900, xl: 1000 },
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
          {shows &&
            shows.map((shows) => (
              <div style={styles.background} key={shows._id}>
                <div style={styles.boxes}>
                  <h4 style={styles.text}>{shows.date}</h4>
                  <h4 style={styles.links}>{shows.venue}</h4>
                  <h4 style={styles.text}>{shows.start}</h4>
                  <h4 style={styles.text}>{shows.attending}</h4>
                  <IconButton color='primary'><TextSnippetIcon /></IconButton>
                  <IconButton color='primary'><EditIcon /></IconButton>
                  <IconButton color='primary'><DeleteIcon /></IconButton>
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
