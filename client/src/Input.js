import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import logo from "./assets/Group (1).png";
import data from "./Codes.js";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import useId from "react-use-uuid";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";

const Input = () => {
  const navigate = useNavigate();
  const key = useId();
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
  });
  const [age, setAge] = useState("");
  const [show, setshow] = useState(false);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  let [firstnameError, setfirstnameError] = useState(false);
  let [lastnameError, setlastnameError] = useState(false);
  let [phoneError, setphoneError] = useState(false);
  let [emailError, setemailError] = useState(false);
  let [invalidEmail, setInvalidEmail] = useState(false);
  let [invalidpass, setInvalidpass] = useState(false);
  let [passwordError, setpasswordError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!input.firstname) {
      console.log("---");
      setfirstnameError(true);
    } else {
      setfirstnameError(false);
      if (!input.lastname) {
        setlastnameError(true);
      } else {
        setlastnameError(false);
        if (!phone) {
          setphoneError(true);
        } else {
          setphoneError(false);
          if (!email) {
            setemailError(true);
          } else {
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!email.match(mailformat)) {
              setInvalidEmail(true);
            } else {
              console.log(email);
              setemailError(false);
              setInvalidEmail(false);
              console.log("===");
              if (!password) {
                setpasswordError(true);
              } else {
                setpasswordError(false);
                axios.post("/", {
                  id: key,
                  firstname: input.firstname,
                  lastname: input.lastname,
                  useremail: email,
                  userpassword: password,
                  phone: phone,
                });
                reset();
                setloading(true);
                setTimeout(() => {
                  reset();
                  navigate(`/thank/${key}`);
                }, 3000);
              }
            }
          }
        }
      }
    }
    console.log(data);
    console.log(phone);
    // e.preventDefault()
  };

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   console.log(event.target.value);
  // };

  const handlefirstname = (event) => {
    setfirstnameError(false)
   
    if (event.target.name === "firstname") {
      
      setInput({
        ...input,
        [event.target.name]:
        event.target.value.charAt([0]).toUpperCase() +
        event.target.value.slice(1),
      });
      
    }
  };
  
  const handlelastname = (event) => {
    if(!input.firstname){
      setlastnameError(false)
      setfirstnameError(true)
    }
    else{
      setphoneError(false)
      setlastnameError(false)
      setfirstnameError(false)
      if (event.target.name === "lastname") {
        
        setInput({
          ...input,
          [event.target.name]:
          event.target.value.charAt([0]).toUpperCase() +
          event.target.value.slice(1),
        });
        
      }
    }
  };
  // const handleLastname = (event) => {
  //   if (event.target.name === "lastname") {
  //     if (!input.firstname) {
  //       setfirstnameError(true);
  //     } else {
  //       setfirstnameError(false);
  //       setInput({
  //         ...input,
  //         [event.target.name]:
  //           event.target.value.charAt([0]).toUpperCase() +
  //           event.target.value.slice(1),
  //       });
  //     }
  //   }
    // const StyleTextField = styled(TextField)({
    //   "& .css-10botns-MuiInputBase-input-MuiFilledInput-input": {
    //     border: "1px solid gray",
    //   },
    //   "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root": {
    //     backgroundColor: "#ffff",
    //   },
    //   "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before": {
    //     borderBottomColor: "rgba(0, 0, 0, 0.06)",
    //   },
    //   "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after": {
    //     borderBottomColor: "rgba(0, 0, 0, 0.06)",
    //   },
    // });
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <div
                  style={{ display: "flex", justifyContent: "spaceBetween" }}
                >
                  <TextField
                    // sx={show ? { border: "1px solid red" } : {}}
                    sx={firstnameError?{
                      marginRight:"10px",
                      "& label": {
                        color: "#0000008A",
                        backgroundColor: "#ffff",
                      },
                      "& label.Mui-focused": {
                        color: "cyan",
                        backgroundColor: "#ffff",
                      },
                      "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                        {
                          border:"1px solid red"
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#ffff",
                      },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                        },
                    }:{
                      marginRight:"10px",
                      "& label": {
                        color: "#0000008A",
                        backgroundColor: "#ffff",
                      },
                      "& label.Mui-focused": {
                        color: "cyan",
                        backgroundColor: "#ffff",
                      },
                      "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                      {
                          border: "1px solid #DFDFDF",
                          backgroundColor: "#ffff"
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#ffff",
                      },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                          // backgroundColor: "#ffff"
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                          backgroundColor: "#ffff"
                        },
                    }}
                    autoComplete="current-text"
                    type="text"
                    label="First name"
                    variant="filled"
                    id="custom-css-outlined-input"
                    margin="normal"
                    value={input.firstname}
                    name="firstname"
                    onChange={handlefirstname}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={firstnameError}
                  />
                  <TextField
                    // sx={show ? { border: "1px solid red" } : {}}
                    sx={lastnameError?{
                      "& label": {
                        color: "#0000008A",
                        backgroundColor: "#ffff",
                      },
                      "& label.Mui-focused": {
                        color: "cyan",
                        backgroundColor: "#ffff",
                      },
                      "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                        {
                          border:"1px solid red",
                          backgroundColor: "hsl(205,56%,76%)",
                          transitionProperty: "backgroundColor",
                          transitionDuration: "2s"
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#ffff",
                      },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                        },
                    }:{
                      "& label": {
                        color: "#0000008A",
                        backgroundColor: "#ffff",
                      },
                      "& label.Mui-focused": {
                        color: "cyan",
                        backgroundColor: "#ffff",
                      },
                      "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                      {
                          border: "1px solid #DFDFDF",
                          backgroundColor: "#ffff"
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#ffff",
                      },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                          // backgroundColor: "#ffff"hsl(205,56%,76%);
                        },
                      "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                        {
                          borderBottomColor: "rgba(0, 0, 0, 0.06)",
                          backgroundColor: "#ffff"
                        },
                    }}
                    autoComplete="current-text"
                    type="text"
                    label="Last name"
                    variant="filled"
                    id="custom-css-outlined-input"
                    margin="normal"
                    value={input.lastname}
                    name="lastname"
                    onChange={handlelastname}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={lastnameError}
                  />
                </div>

                <PhoneInput
                  placeholder="Phone number"
                  containerStyle={
                    phoneError
                      ? { border: "1px solid red", height: "4em" }
                      : { border: "1px solid #DFDFDF", height: "4em" }
                  }
                  buttonStyle={{ border: "none", backgroundColor: "#ffff" }}
                  inputStyle={{
                    border: "none",
                    height: "4em",
                    width: "100%",
                    color: "#0000008A",
                  }}
                  country={"us"}
                  value={phone}
                  onChange={(phone) =>{
                    if(!input.lastname){
                      setlastnameError(true)
                      setphoneError(false)
                    }
                    else{
                      setphoneError(false)
                      setlastnameError(false)
                      setphone(phone)
                    }
                    }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  // error={phoneError}
                />
                <TextField
                  id="standard-password-input"
                  label="Email"
                  type="email"
                  autoComplete="current-email"
                  variant="filled"
                  margin="normal"
                  sx={
                    emailError
                      ? {
                          border: "1px solid red",
                          "& label": {
                            color: "#0000008A",
                            backgroundColor: "#ffff",
                          },
                          "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                            {
                              border: "1px solid #DFDFDF",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root":
                            {
                              backgroundColor: "#ffff",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                        }
                      : {
                          "& label": {
                            color: "#0000008A",
                            backgroundColor: "#ffff",
                          },
                          "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                            {
                              border: "1px solid #DFDFDF",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root":
                            {
                              backgroundColor: "#ffff",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                        }
                  }
                  value={email}
                  name="email"
                  onChange={(e) => {
                    setemail(e.target.value)
                      if(!phone){
                        setphoneError(true)
                        
                      }
                      else{
                        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (!email.match(mailformat)) {
                          setInvalidEmail(true);
                          setemail(e.target.value)
                        } else {
                          setInvalidEmail(false);
                        setemailError(false)
                        setphoneError(false)
                        setemail(e.target.value)
                        }
                      }
                      }}
                  // {...register("email", {
                  // required: "Email is required.",
                  // pattern: {
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message: "Invalid email",
                  // },
                  // })}
                  // onKeyUp={() => {
                  //   trigger("email");
                  // }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={emailError}
                />
                {invalidEmail && (
                  <small className="text-danger">Invalid Email</small>
                )}

                <TextField
                  id="standard-password-input"
                  label="Password "
                  type="password"
                  autoComplete="current-text"
                  variant="filled"
                  margin="normal"
                  sx={
                    passwordError
                      ? {
                          border: "1px solid red",
                          "& label": {
                            color: "#0000008A",
                            backgroundColor: "#ffff",
                          },
                          "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                            {
                              border: "1px solid #DFDFDF",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root":
                            {
                              backgroundColor: "#ffff",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                        }
                      : {
                          "& label": {
                            color: " #0000008A",
                            backgroundColor: "#ffff",
                          },
                          "& .css-10botns-MuiInputBase-input-MuiFilledInput-input":
                            {
                              border: "1px solid #DFDFDF",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root":
                            {
                              backgroundColor: "#ffff",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:before":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:after":
                            {
                              borderBottomColor: "rgba(0, 0, 0, 0.06)",
                            },
                          "& .css-cio0x1-MuiInputBase-root-MuiFilledInput-root:hover":
                            {
                              boderBottomColor: "#DFDFDF",
                            },
                        }
                  }
                  // {...register("password", {
                  //   pattern: {
                  //     value:
                  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  //     message:
                  //       "Password must contain atleast one uppercase, one lowercase & one digit",
                  //   },
                  //   minLength: {
                  //     value: 8,
                  //     message:
                  //       "Oops! You need a password longer than 8 characters with numbers and letters.",
                  //   },
                  // })}
                  // onKeyUp={() => {
                  //   trigger("password");
                  // }}
                  value={password}
                  name="password"
                  onChange={(e) =>{
                      if(!email){
                        setemailError(true)
                      }
                      else{
                        let passformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,1000}$/;
                        if (!password.match(passformat)) {
                          setInvalidpass(true);
                          setpassword(e.target.value)
                        } else {
                          setInvalidpass(false);
                        setemailError(false)
                        setpasswordError(false)
                        setpassword(e.target.value)
                        }
                        // setInvalidpass(false);
                        // setpasswordError(false)
                        // setemailError(false)
                        // setpassword(e.target.value)
                      }}
                      }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={passwordError}
                />
                {invalidpass? (
                  <small className="text-danger">
                    Oops! You need a password longer than 8 characters with numbers and letters.
                  </small>
                ):""}
              </FormControl>
              <br />

              <button
                variant="contained"
                type="submit"
                style={{
                  marginTop: "25px",
                  width: "100%",
                  backgroundColor: "#02E0B1",
                  height: "55px",
                  borderRadius: "2px ",
                  Opacity: "60%",
                  padding: "6px 16px",
                  textTransform: "uppercase",
                  fontFamily: "Raleway",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  letterSpacing: "0.02857em",
                  border: "1px solid #02E0B1",
                  color: "#ffff",
                }}
              >
                {loading ? <CircularProgress color="inherit" /> : "Next"}
              </button>
            </form>
          </Paper>
        </Container>
      </>
    );
  };

export default Input;
