import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import envelop from "./assets/Group.png";
import logo from "./assets/Group (1).png";

const Thank = () => {
  const { id } = useParams();
  const [Data, setData] = useState({});
  axios
    .get(`http://localhost:4000/thank/${id}`)
    .then((response) => {
      setData(response.data.user);
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <>
      <Container sx={{ my: "3rem" }}>
        <Paper
          sx={{
            boxShadow: 4,
            p: 5,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "red" : "#fff",
          }}
          elevation={3}
        >
          <div
            style={{
              display: "flex",
              alignItem: "center",
              marginBottom: "2em",
              fontFamily: "Rawline",
            }}
          >
            <img
              src={logo}
              width="45px"
              height="40px"
              // style={{ marginTop: "20px" }}
              alt=""
            />
            <h1
              style={{
                color: "#4F4F4F",
                fontWeight: "light",
                fontSize: "2.5em",
                fontFamily: "Rawline",
              }}
            >
              uPet
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
            <img
              src={envelop}
              alt="envelop"
              style={{ margin: "30px  30px 30px 0" }}
            />
            <Typography variant="h4" sx={{ fontFamily: "Rawline" }}>
              Thanks, {Data.firstName} We've received your Application
            </Typography>
          </div>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.54)",
              fontSize: "15px",
              marginTop: "45px",
              fontFamily: "Rawline",
            }}
          >
            We will process your application as soon as possible and send you a
            deceision within 30 days to {Data.Phone} or {Data.email}
            we will contact you in case more information needed.
          </p>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.54)",
              fontSize: "15px",
              fontFamily: "Rawline",
            }}
          >
            While we're reviewing your application. Please don't submit another
            application for the uPet breeder program
          </p>
        </Paper>
      </Container>
    </>
  );
};

export default Thank;
