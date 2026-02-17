import { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    title: "",
    actor: "",
    category: ""
  });

  function handleChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(filters);
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
          name="title"
          label="Film Title"
          value={filters.title}
          onChange={handleChange}
          size="small"
          fullWidth
        />

        <TextField
          name="actor"
          label="Actor Name"
          value={filters.actor}
          onChange={handleChange}
          size="small"
          fullWidth
        />

        <FormControl size="small" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={filters.category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Animation">Animation</MenuItem>
            <MenuItem value="Children">Children</MenuItem>
            <MenuItem value="Classics">Classics</MenuItem>
            <MenuItem value="Documentary">Documentary</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Foreign">Foreign</MenuItem>
            <MenuItem value="Games">Games</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
          </Select>
        </FormControl>

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
