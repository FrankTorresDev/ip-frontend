import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          Sakila 
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/films">
            Films
          </Button>
          <Button color="inherit" component={RouterLink} to="/actors">
            Actors
          </Button>
          <Button color="inherit" component={RouterLink} to="/customers">
            Customers
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
