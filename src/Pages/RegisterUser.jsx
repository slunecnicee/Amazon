import React from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { baseAPI } from "../servises/baseApi";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../features/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reg, setReg] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [secondPwd, setSecondPwd] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReg((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangePwd = (e) => {
    setSecondPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reg.password !== secondPwd) {
      toast.error("Passwords do not match");
    } else if (reg.password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (!/[a-zA-Z]/.test(reg.password)) {
      toast.error("Password must contain at least one letter");
    } else {
      try {
        const res = await baseAPI.post("/api/user/registerUser", reg);
        console.log(res);
        if (res.status === 200) {
          dispatch(handleSignIn());
          toast.success("registration was successful");
          navigate("/login");
          setReg({
            username: "",
            email: "",
            password: "",
          });
          setSecondPwd("");
        }
      } catch (err) {
        toast.error("Something went wrong try again later ");
      }
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          "&::after": {
            content: '""',
            display: "block",
            width: "100%",
            height: "2px",
            backgroundColor: "darkgray",
            boxShadow:
              "0 30px 30px black, 0 10px 30px black, 1px 5px 15px black", //
          },
        }}
      >
        <img
          onClick={() => navigate("/")}
          style={{ width: "200px", height: "100px", mixBlendMode: "multiply" }}
          src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
          alt="logo"
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            gap: 1,
            border: "1px solid gray",
            minWidth: "250px",
            minHeight: "500px",
            borderRadius: "10px",
            maxWidth: "450px",
            textAlign: "start",
          }}
        >
          <Typography variant="h4" component="h2">
            {" "}
            Create Account{" "}
          </Typography>

          <Typography variant="p" component="h5">
            {" "}
            UserName{" "}
          </Typography>

          <TextField
            name="username"
            value={reg.username}
            label=""
            required
            variant="outlined"
            onChange={handleChange}
          />

          <Typography variant="p" component="h5">
            {" "}
            Email{" "}
          </Typography>
          <TextField
            name="email"
            required
            value={reg.email}
            label=""
            variant="outlined"
            onChange={handleChange}
          />

          <Typography variant="p" component="h5">
            {" "}
            Password{" "}
          </Typography>

          <TextField
            name="password"
            required
            value={reg.password}
            label=""
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    backgroundColor: "transparent",
                    padding: "0",
                    minWidth: "unset",
                    marginRight: "-8px",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />

          <Typography variant="p" component="h5">
            {" "}
            Repeat Password{" "}
          </Typography>
          <TextField
            name="secondpassword"
            required
            type={showPassword ? "text" : "password"}
            value={secondPwd}
            label=""
            variant="outlined"
            onChange={handleChangePwd}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    backgroundColor: "transparent",
                    padding: "0",
                    minWidth: "unset",
                    marginRight: "-8px",
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />

          <Typography component="p">
            {" "}
            ! password must be at least 6 characters{" "}
          </Typography>

          <Button
            sx={{
              backgroundColor: "#f0c14b",
              color: "black",
              height: "30px",
              fontSize: "small",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#ffbd17",
              },
            }}
            onClick={handleSubmit}
          >
            Continue
          </Button>

          <Typography
            sx={{
              marginTop: "25px",
              fontSize: "small",
              "&::after": {
                content: '""',
                display: "block",
                width: "100%",
                height: "2px",
                backgroundColor: "darkgray",
                boxShadow:
                  "0 30px 30px black, 0 10px 30px black, 1px 5px 15px black",
                margin: "6px 0",
              },
            }}
            component="p"
          >
            {" "}
            By creating an account, you agree to Amazon's{" "}
            <NavLink
              style={{
                color: "#007bff",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              to=""
            >
              Conditions of Use
            </NavLink>{" "}
            and{" "}
            <NavLink
              style={{
                color: "#007bff",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              to="/privacynotice"
            >
              Privacy Notice
            </NavLink>
            .
          </Typography>

          <Typography
            onClick={() => navigate("/login")}
            sx={{
              marginTop: "15px",
              fontSize: "small",
              "&:hover": {
                textDecoration: "underline",
                color: "#007bff",
              },
            }}
            component="p"
          >
            {" "}
            already have an account? <span>sign in</span>
          </Typography>

          <Typography
            sx={{
              fontSize: "small",
            }}
            component="p"
          >
            {" "}
            Buying for Work? <span>create a free bussiness account </span>
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: "small",
          color: "black",
          display: "flex",
          gap: "15px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="p"
      >
        <NavLink
          style={{
            color: "#007bff",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          to=""
        >
          contions of use
        </NavLink>
        <NavLink
          style={{
            color: "#007bff",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          to=""
        >
          Privacy notice{" "}
        </NavLink>
        <NavLink
          style={{
            color: "#007bff",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          to=""
        >
          {" "}
          Help
        </NavLink>
      </Typography>

      <br />

      <Typography
        sx={{
          fontSize: "small",
          color: "gray",
        }}
        component="p"
      >
        {" "}
        © 1996-2022, Amazon.com, Maia Kiknavelizde, Slay your day{" "}
      </Typography>
    </Box>
  );
};

export default RegisterUser;
