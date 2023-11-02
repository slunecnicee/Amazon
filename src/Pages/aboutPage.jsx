import { Grid, Typography, List, ListItem, Button, Paper } from "@mui/material";

const dependencies = [
  "Stripe",
  "React-Redux",
  "axios",
  "Material Ui",
  "SCSS",
  "react-icons",
  "react-router-dom",
  "react-slick",
  "slick-carousel",
  "react-spinners",
  "react-toastify",
];

const About = () => {
  const halfwayIndex = Math.ceil(dependencies.length / 2);
  const firstHalfDependencies = dependencies.slice(0, halfwayIndex);
  const secondHalfDependencies = dependencies.slice(halfwayIndex);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Paper style={{ padding: "16px", background: "white" }}>
            <Typography
              variant="h4"
              sx={{ paddingBottom: "10px" }}
              align="center"
            >
              About This Project
            </Typography>
            <Typography variant="body1">
              This React JS project is an Amazon E-commerce Website that
              resembles Amazon, with its unique features and functionalities.
            </Typography>
            <List>
              <Typography
                sx={{
                  borderBottom: "1px solid gray",
                  paddingBottom: "10px",
                  fontWeight: "bold",
                }}
                variant="body1"
              >
                Dependencies:
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <List>
                    {firstHalfDependencies.map((dependency) => (
                      <ListItem
                        key={dependency}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            "&::before": {
                              content: '"\\2022"',
                              color: "black",
                              fontSize: "1.5em",
                              marginRight: "8px",
                            },
                          }}
                        >
                          {dependency}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    {secondHalfDependencies.map((dependency) => (
                      <ListItem
                        key={dependency}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            "&::before": {
                              content: '"\\2022"',
                              color: "black",
                              fontSize: "1.5em",
                              marginRight: "8px",
                            },
                          }}
                        >
                          {dependency}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </List>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f0c000",
                color: "black",
                "&:hover": { backgroundColor: "#fcca02", color: "black" },
              }}
              fullWidth
              href="https://github.com/slunecnicee/Amazon"
              target="_blank"
            >
              Go To Repository
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
