import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { userSignIn } from "../servises/userSignIn";
import { handleLogIn } from "../features/user";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: "sdfgn@fgg",
    password: "d123456",
  });

  console.log(login);

  const [paswordFiled, setPaswordFiled] = useState(false);

  const handleContinue = () => {
    if (login.email === "") {
      toast.error("email is required");
    } else {
      setPaswordFiled(true);
    }
  };

  const handleEmailChange = () => {
    setPaswordFiled(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async () => {
    try {
      const response = await userSignIn(login);
      console.log(response.data.jwt);
      if (response.data.jwt) {
        localStorage.setItem("token", response.data.jwt);
        const decodedToken = jwtDecode(response.data.jwt);
        dispatch(handleLogIn(decodedToken));
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        console.log("No JWT token received");
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Wrong email or password");
    }
  };

  return (
    <>
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
                "0 30px 30px black, 0 10px 30px black, 1px 5px 15px black",
            },
          }}
        >
          <img
            onClick={() => navigate("/")}
            style={{
              width: "200px",
              height: "100px",
              mixBlendMode: "multiply",
              cursor: "pointer",
            }}
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
              minHeight: "300px",
              borderRadius: "10px",
              maxWidth: "450px",
              textAlign: "start",
            }}
          >
            {paswordFiled === false ? (
              <>
                <Typography variant="h4" component="h2">
                  Sign In
                </Typography>

                <Typography
                  variant="h7"
                  component="p"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  Email
                </Typography>
                <TextField
                  name="email"
                  required
                  label=""
                  variant="outlined"
                  value={login.email}
                  onChange={handleChange}
                />

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
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="h7"
                  component="p"
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  Password
                </Typography>

                <Typography
                  variant="subtitle"
                  component="Subtitle"
                  sx={{ fontSize: "15px" }}
                >
                  {login.email}{" "}
                  <span className="change" onClick={handleEmailChange}>
                    change
                  </span>
                </Typography>

                <TextField
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  value={login.password}
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
                  onClick={onLogin}
                >
                  Sign In
                </Button>
              </>
            )}

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
                to=""
              >
                Privacy Notice
              </NavLink>
            </Typography>

            <Typography
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
              need Help?
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "small",
              color: "darkgray",
              position: "relative",
              "&::after": {
                content: '""',
                display: "block",
                width: "100%",
                height: "1px",
                backgroundColor: "gray",
                position: "absolute",
                top: "50%",
                left: "-102%",
              },
              "&::before": {
                content: '""',
                display: "block",
                width: "100%",
                height: "1px",
                backgroundColor: "gray",
                position: "absolute",
                top: "50%",
                right: "-102%",
              },
            }}
            component="p"
          >
            New to Amazon?
          </Typography>

          <Button
            variant="primary"
            onClick={() => navigate("/register")}
            sx={{
              width: "fit-content",
              padding: 2,
              border: "1px solid lightgray",
              borderRadius: "5px",
              boxShadow: "0 0 5px lightgray",
              textDecoration: "line",
            }}
          >
            Create your amazon account
          </Button>
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
    </>
  );
};

export default LoginPage;
