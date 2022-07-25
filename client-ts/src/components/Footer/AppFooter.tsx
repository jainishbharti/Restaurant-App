import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://hififoods.com/" underline="none">
        HiFi Foods 
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(223, 252, 252, 0.29)",
  mr: 1,
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
];

export default function AppFooter() {
  return (
    <div className="footer">
        <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "rgba(223, 252, 252, 0.49)" }}
    >
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: "flex" }}>
                <Box component="a" href="https://facebook.com" sx={iconStyle}>
                  <img
                    src="https://mui.com/static/themes/onepirate/appFooterFacebook.png"
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="https://twitter.com" sx={iconStyle}>
                  <img
                    src="https://mui.com/static/themes/onepirate/appFooterTwitter.png"
                    alt="Twitter"
                  />
                </Box>
              </Grid>
              <Grid item sx={{ display: "flex" }}>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                Terms
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                Privacy
              </Box>
            </Box>
          </Grid>
          <Grid className="lang" item xs={6} sm={8} md={4}>
            <Typography variant="h6" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Container>
    </Typography>
    </div>
  );
}
