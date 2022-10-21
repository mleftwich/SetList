import React from "react";
import { useState } from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { blueGrey } from "@mui/material/colors";
import { teal } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import AddressIcon from "@mui/icons-material/Signpost";
import DateIcon from "@mui/icons-material/EventNote";
import TimeIcon from "@mui/icons-material/AccessTime";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/CancelPresentation";
import Input from "@mui/material/Input";
import SaveIcon from "@mui/icons-material/DoneAll";

// DATA IMPORTS
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BAND_SHOWS } from "../../utils/queries";
import { EDIT_NOTES, REMOVE_SHOW } from "../../utils/mutations";

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
    width: "100%",
  },
  heading: {
    color: "white",
    fontFamily: "Share Tech Mono, cursive",
    textAlign: "center",
    textShadow: "4px 4px 4px black",
  },
  background: {
    color: "white",
    border: "1px solid rgba(455, 455, 455, 0.2)",
    borderRadius: 5,
    width: "auto",
    marginTop: "1px",
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
  inputs: {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgb(255, 255, 255, 0.3)",
    borderRadius: 5,
    fontFamily: "Share Tech Mono, monospace",
    width: "100%",
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

  // FUNCTION TO DELETE SHOW
  const [delShow, { error: removeError, data: removeData }] =
    useMutation(REMOVE_SHOW);
  async function handleDelete(show) {
    try {
      const data = await delShow({
        variables: {
          id: show,
        },
      });
      if (!data) {
        refetch();
      }
      refetch();
    } catch (e) {
      console.error(e);
    }
  }

  // FUNCTION TO UPDATE NOTES
  const [editNotes, { error: editError, loading: load, data: editData }] =
    useMutation(EDIT_NOTES);
  async function handleEdit(id, notes) {
    console.log(notes);
    try {
      const data = await editNotes({
        variables: {
          id: id,
          notes: notes,
        },
      });
      if (!data) {
        refetch();
      }
      refetch();
    } catch (e) {
      console.error(e);
    }
  }

  // NOTES MODAL
  const handleClose = () => {
    setOpen(false);
    setClose(true);
  };
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState("");
  const [notes, setNotes] = useState("");
  const [showId, setShowId] = useState("");

  function handleOpen(note) {
    setNotes(note);
    setOpen(true);
  }
  const defaultValues = {
    notes: notes,
  };
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const noteDiv = () => {
    return (
      <div style={styles.container}>
        <Modal
          open={open}
          close={close}
          sx={{ justifyContent: "center" }}
          className="fade"
        >
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
            <h3 style={styles.links}>notes</h3>
            <Input
              id="notes"
              name="notes"
              inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
              type="text"
              value={formValues.notes}
              onChange={handleInputChange}
              style={styles.inputs}
              multiline={true}
              rows={10}
            />
            <div style={styles.container}>
              <IconButton color="primary" onClick={() => handleClose()}>
                <CloseIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => handleEdit(showId, formValues.notes)}
                sx={{ marginLeft: "1rem" }}
              >
                <SaveIcon />
              </IconButton>
            </div>
            <div style={styles.container}>
              {load && <CircularProgress />}
              {editData && <p style={styles.text}>onward</p>}
              {editError && <p style={styles.error}>fail</p>}
            </div>
          </Box>
        </Modal>
      </div>
    );
  };

  // DASHBOARD PAGE
  refetch();
  return (
    <div className="fade">
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
          <div style={styles.container}>
            <p style={styles.links}>note:</p>
            <p style={styles.text}>listings last 3 months</p>
          </div>
          {shows &&
            shows.map((shows) => (
              <div style={styles.background} key={shows._id}>
                <div style={styles.boxes}>
                  <h4 style={styles.text}>
                    <DateIcon sx={{ color: blueGrey[400] }} /> {shows.date}
                  </h4>
                  <h3 style={styles.venue}>
                    <AddressIcon sx={{ color: blueGrey[400] }} /> <br />
                    {shows.venue}
                  </h3>
                  <h4 style={styles.text}>
                    <TimeIcon sx={{ color: blueGrey[400] }} /> {shows.start}
                  </h4>
                  <h4 style={styles.text}>{shows.attending}</h4>

                  <IconButton
                    color="primary"
                    onClick={() =>
                      handleOpen(shows.notes) &
                      setNotes(shows.notes) &
                      setFormValues({ notes: shows.notes }) &
                      setShowId(shows._id)
                    }
                  >
                    <TextSnippetIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDelete(shows._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}

          <div style={styles.container}>
            {(error || removeError) && (
              <p style={styles.error}>
                engineer's had too many please try again
              </p>
            )}
            {loading && <CircularProgress />}
            {removeData && null}
          </div>
        </Box>
        <div style={styles.container}>{open ? noteDiv() : null}</div>
      </div>
    </div>
  );
}
