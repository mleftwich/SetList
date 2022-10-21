import { useState } from "react";
import React from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import { teal } from "@mui/material/colors";
import AddressIcon from "@mui/icons-material/Signpost";
import BandIcon from "@mui/icons-material/SpeakerGroup";
import DateIcon from "@mui/icons-material/EventNote";
import TimeIcon from "@mui/icons-material/AccessTime";
import CircularProgress from "@mui/material/CircularProgress";
import GenreIcon from "@mui/icons-material/SpatialTracking";
import AboutIcon from "@mui/icons-material/HelpOutline";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/CancelPresentation";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
// DATA IMPORTS
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_SHOWS } from "../utils/queries";
import { QUERY_NAME } from "../utils/queries";

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
    marginTop: "1px",
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
    justifyContent: "space-evenly",
  },
  address: {
    color: blueGrey[200],
    fontFamily: "Share Tech Mono, monospace",
    textAlign: "center",
    textDecoration: "none",
  },
  pic: {
    height: "8rem",
    width: "auto",
    top: "10rem",
    borderRadius: "200px",
    opacity: "90%",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    padding: "5px",
  },
};

export function Gigs() {
  // GET SHOWS
  const { loading, error, data } = useQuery(QUERY_SHOWS);
  const res = [data?.allshows];
  const shows = res[0];

  // BAND INFO MODAL
  // const [getBand, { loading: load, error: err, data: response, refetch: fetch}] = useLazyQuery(QUERY_NAME, { fetchPolicy: "network-only", onCompleted: () => handleInfo() });
  const [getBand, { loading: load, error: err, data: response }] =
    useLazyQuery(QUERY_NAME);
  // state
  const [info, setInfo] = useState(null);
  const [close, setClose] = useState("");
  const [open, setOpen] = useState(false);
  // modal open/close
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setClose(true);
  };
  // on click query
  function onClick(show) {
    console.log("sent to query:", show.band);
    getBand({ variables: { name: show.band } }).then((res) => {
      setInfo(res.data.userName);
      handleOpen();
    });
  }

  // ADDRESS POPOVER
  const [anchor, setAnchor] = useState(null);
  const [address, setAddress] = useState("");
  const mouseOver = (address) => {
    setAddress(address);
  };
  const handlePop = (event) => {
    setAddress(address);
    setAnchor(event.currentTarget);
  };
  const handlePopClose = () => {
    setAddress("");
    setAnchor(null);
  };
  const openPop = Boolean(anchor);
  const addId = open ? "address-popover" : undefined;
  // ACTUAL MODAL BODY
  const BandModal = () => {
    return (
      <div style={styles.container} className="fade">
        <Modal open={open} close={close} className="fade">
          <Box
            sx={{
              width: { xs: 250, sm: 300, md: 400, lg: 500, xl: 500 },
              backgroundColor: "rgb(0, 0, 0, 0.7)",
              borderRadius: 3,
              transition: "ease in",
              margin: 1,
              padding: 1.5,
            }}
          >
            <div style={styles.container}>
              {load && <p style={styles.text}>loading..</p>}
              <h2 style={styles.band}>{info?.name}</h2>
            </div>
            <div style={styles.container}>
              <img src={info?.image} alt="" style={styles.pic} />
            </div>
            <div style={styles.container}>
              <GenreIcon sx={{ color: teal[200], marginTop: "1rem" }} />
            </div>
            <div style={styles.container}>
              <p style={styles.text}>{info?.genre}</p>
            </div>
            <div style={styles.container}>
              <AboutIcon sx={{ color: teal[200] }} />
            </div>
            <div style={styles.container}>
              <p style={styles.text}>{info?.about}</p>
            </div>
            <div style={styles.container}>
              <IconButton color="primary" onClick={() => handleClose()}>
                <CloseIcon />
              </IconButton>
            </div>
            {err && <p style={styles.text}>dodgy</p>}
            {response && null}
          </Box>
        </Modal>
      </div>
    );
  };

  // MAIN PAGE
  return (
    <div className="fade">
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
          <div>{open && BandModal()}</div>
          {shows &&
            shows.map((shows) => (
              <div
                style={styles.background}
                key={shows._id}
                onMouseUp={() => mouseOver(shows.address)}
              >
                <div style={styles.boxes}>
                  <h4 style={styles.text}>
                    <DateIcon sx={{ color: blueGrey[400] }} /> {shows.date}
                  </h4>
                  <Link
                    onClick={() => onClick(shows)}
                    component="button"
                    sx={{
                      fontFamily: "PT Mono",
                      fontSize: "1.2rem",
                      marginLeft: ".5rem",
                    }}
                    className="bandlink"
                    underline="none"
                  >
                    <h3 style={styles.band}>
                      <BandIcon sx={{ color: blueGrey[400] }} />
                      {shows.band}
                    </h3>
                  </Link>
                  <h4 style={styles.text}>
                    <Link
                      onClick={handlePop}
                      component="button"
                      underline="none"
                      sx={{
                        fontFamily: "Share Tech Mono",
                        color: "white",
                        fontSize: "1rem",
                      }}
                    >
                      <AddressIcon sx={{ color: blueGrey[400] }} />{" "}
                      <b>{shows.venue}</b>
                    </Link>
                  </h4>
                  <Popover
                    id={addId}
                    open={openPop}
                    anchorEl={anchor}
                    onClose={handlePopClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    className="pop"
                  >
                    <div style={styles.container}>
                      <AddressIcon />
                      <Typography style={styles.links}>{address}</Typography>
                    </div>
                  </Popover>
                  <h4 style={styles.text}>
                    <TimeIcon sx={{ color: blueGrey[400] }} /> {shows.start}
                  </h4>
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
