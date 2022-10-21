import React from "react";
import { useState } from "react";
// MATERIAL IMPORTS
import { Box } from "@mui/system";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
// GRAPHQL IMPORTS
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import { EDIT_USER } from "../../utils/mutations";

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
  pic: {
    height: "12rem",
    width: "auto",
    top: "10rem",
    borderRadius: "200px",
    opacity: "90%",
    border: "2px solid rgba(255, 255, 255, 0.5)",
    padding: "5px",
  },
  band: {
    color: teal[100],
    fontFamily: "PT Mono, monospace",
    textAlign: "center",
  },
};

export function Profile() {
  // GET USER INFO
  const { error, loading, data, refetch } = useQuery(QUERY_USER, {
    variables: { _id: Auth.getProfile().data._id },
  });
  const band = data?.user;

  // EDIT USER INFO

  // ADD SHOW
  const [editUser, { error: userError }] = useMutation(EDIT_USER);
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await editUser({
        variables: {
          id: band._id,
          email: formValues.email,
          image: formValues.image,
          genre: formValues.genre,
          about: formValues.about,
        },
      });
      if (data) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
    refetch();
  };

  // PROFILE FORM

  // DEFAULT VALUES
  const defaultValues = {
    email: band.email,
    image: band.image,
    genre: band.genre,
    about: band.about,
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
          <h1 style={styles.band} className="heading">
            {band.name}
          </h1>
          <div style={styles.container}>
            <img src={band.image} style={styles.pic} alt="" />
          </div>
          <br />
          <div style={styles.container}>
            <div style={styles.background}>
              {/* EMAIL FIELD  */}
              <h4 style={styles.labels}>email:</h4>
              <Input
                id="email"
                required
                name="email"
                placeholder="Email address"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* IMAGE FIELD  */}
              <h4 style={styles.labels}>image:</h4>
              <Input
                id="image"
                required
                name="image"
                placeholder="Link to an image"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.image}
                onChange={handleInputChange}
                style={styles.inputs}
              />

              {/* GENRE FIELD  */}
              <h4 style={styles.labels}>genre:</h4>
              <Input
                id="genre"
                required
                name="genre"
                placeholder="Genre"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.genre}
                onChange={handleInputChange}
                style={styles.inputs}
              />
              {/* ABOUT FIELD */}
              <h4 style={styles.labels}>about:</h4>
              <Input
                id="about"
                required
                name="about"
                placeholder="Use this space to tell everyone about your act - influences, what to expect from a show and links to socials"
                inputProps={{ style: { color: "rgb(255, 255, 255)" } }}
                type="text"
                value={formValues.about}
                onChange={handleInputChange}
                style={styles.inputs}
                multiline={true}
                rows={5}
              />

              <div style={styles.container}>
                {/* BUTTON FIELD */}
                <Button
                  variant="outlined"
                  style={styles.button}
                  onClick={() => handleFormSubmit()}
                >
                  <b>save</b>
                </Button>
              </div>
              <div style={styles.container}>
                {(error || userError) && (
                  <p style={styles.error}>engineer's had too many try again</p>
                )}
                {loading && <CircularProgress />}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
