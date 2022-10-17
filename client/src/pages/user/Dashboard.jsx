import React from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { blueGrey } from "@mui/material/colors";
import { teal } from "@mui/material/colors"
import IconButton from '@mui/material/IconButton';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import AddressIcon from '@mui/icons-material/Signpost';
import DateIcon from '@mui/icons-material/EventNote';
import TimeIcon from '@mui/icons-material/HistoryToggleOff';
// DATA IMPORTS
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BAND_SHOWS } from "../../utils/queries";
import { REMOVE_SHOW } from "../../utils/mutations";

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
  venue: {
    color: teal[100],
    fontFamily: "PT Mono, monospace",
   
  },
};



export default function Dashboard() {

  // GET BAND SHOWS
  const band = localStorage.getItem("band");
  const { error, loading, data, refetch } = useQuery(QUERY_BAND_SHOWS, {
    variables: { band: band },
  });
  const res = [data?.shows];
  const shows = res[0];
console.log(shows)
// FUNCTION TO DELETE SHOW

const [delShow, { error: removeError, data: removeData }] = useMutation(REMOVE_SHOW);

async function handleDelete(show) {
  
  try {
  const data = await delShow({
    variables: {
      id: show,
  }});
  refetch()
}catch (e) {
  console.error(e);
}}
  
refetch()
  return (
    <div>
      <div style={styles.container}>
        <Box
          sx={{
            width: { xs: 400, sm: 400, md: 700, lg: 900, xl: 1000 },
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
                  <h4 style={styles.text}><DateIcon sx={{ color: blueGrey[400]}} /> {shows.date}</h4>
                  <h3 style={styles.venue}><AddressIcon sx={{ color: blueGrey[400]}} /> <br />{shows.venue}</h3>
                  <h4 style={styles.text}><TimeIcon sx={{ color: blueGrey[400]}} /> {shows.start}</h4>
                  <h4 style={styles.text}>{shows.attending}</h4>
                  <IconButton color='primary'><TextSnippetIcon /></IconButton>
                  <IconButton color='primary'><EditIcon /></IconButton>
                  <IconButton color='primary' onClick={() => handleDelete(shows._id)}><DeleteIcon /></IconButton>
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
