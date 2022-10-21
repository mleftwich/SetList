import React from "react";
import { useState } from "react";

// MATERIAL IMPORTS
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Success from "@mui/icons-material/DoneAllOutlined";
// GRAPHQL IMPORTS
import { useMutation, useQuery } from "@apollo/client";
import { ADD_SHOW } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";

// STYLES
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
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
    padding: "3rem",
    borderRadius: 5,
    width: "50%",
  },
  labels: {
    color: "white",
    fontFamily: "PT Mono, cursive",
  },
  text: {
    color: "white",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
  inputs: {
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "rgb(255, 255, 255, 0.3)",
    borderRadius: 5,
    fontFamily: "Share Tech Mono, monospace",
    width: "100%",
  },
  button: {
    color: "white",
    margin: "1rem",
    fontFamily: "Agency FB, cursive",
  },
  error: {
    color: "orange",
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
};

export function Add() {
  // GET USER INFO
  const { err, loading, data } = useQuery(QUERY_USER, {
    variables: { _id: Auth.getProfile().data._id },
  });
  const band = data?.user.name;

  // DEFAULT VALUES
  const defaultValues = {
    venue: "",
    address: "",
    date: "",
    start: "",
    notes: "",
  };

  // STATE
  const [formValues, setFormValues] = useState(defaultValues);

  // EVENT HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // ADD SHOW
  const [addShow, { error }] = useMutation(ADD_SHOW);
  const [added, setAdd] = useState(false);
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await addShow({
        variables: {
          band: band,
          venue: formValues.venue,
          address: formValues.address,
          date: formValues.date,
          start: formValues.start,
          notes: formValues.notes,
        },
      });
      if (data) {
        setAdd(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // TIMEOUT SUCCESS EVENT
  setTimeout(() => {
    setAdd(false);
  }, 10000);

  return (
    <div className="fade">
      {/* CONTAINER */}
      <div style={styles.container}>
        <Box
          sx={{
            width: { xs: 500, sm: 500, md: 700, lg: 900, xl: 1000 },
            backgroundColor: "rgb(0, 0, 0, 0.7)",
            borderRadius: 3,
            transition: "ease in",
            margin: 1,

            padding: 1.5,
          }}
        >
          {/* HEADING */}
          <h1 style={styles.heading} className="heading">
            show +
          </h1>

          <div style={styles.container}>
            <div style={styles.background}>
              {/* VENUE FIELD  */}
              <h4 style={styles.labels}>venue:</h4>
              <Input
                id="venue"
                required
                name="venue"
                type="text"
                placeholder="Where is the gig?"
                value={formValues.venue}
                onChange={handleInputChange}
                style={styles.inputs}
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                color="primary"
              />

              {/* ADDRESS FIELD  */}
              <h4 style={styles.labels}>address:</h4>
              <Input
                id="address"
                required
                name="address"
                placeholder="What is the venues address?"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.address}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* DATE FIELD  */}
              <h4 style={styles.labels}>date:</h4>
              <Input
                id="date"
                required
                name="date"
                placeholder="01/02/03"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.date}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* START TIME FIELD  */}
              <h4 style={styles.labels}>start:</h4>
              <Input
                id="start"
                required
                name="start"
                placeholder="0:00am/pm"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.start}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* NOTES FIELD */}
              <h4 style={styles.labels}>notes:</h4>
              <Input
                id="notes"
                required
                name="notes"
                placeholder="Any notes you want to add(only visible to you) - gear list, venue details, set list etc"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.notes}
                onChange={handleInputChange}
                style={styles.inputs}
                multiline={true}
                rows={5}
              />

              <div style={styles.container}>
                {error && <p style={styles.error}>try again</p>}
                {err && (
                  <p style={styles.error}>engineers had too many try again</p>
                )}
                {loading && <CircularProgress />}
                {added && <Success />}
                {data && null}
              </div>
              <div style={styles.container}>
                {/* BUTTON FIELD */}
                <Button
                  variant="outlined"
                  style={styles.button}
                  onClick={() => handleFormSubmit()}
                >
                  <b>add show</b>
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
