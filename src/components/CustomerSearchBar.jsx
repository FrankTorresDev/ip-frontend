import { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{ p: 2, mb: 3 }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <TextField
          label="Search by name, email, or ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{ minWidth: 140, height: 40 }}
        >
          Search
        </Button>
      </Stack>
    </Paper>
  );
}
