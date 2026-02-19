import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getFilms, getFilmByTitle } from "../services/api";
import SearchBar from "../components/SearchBar";
import FilmsTable from "../components/FilmsTable";

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Paper
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MovieIcon from "@mui/icons-material/Movie";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";


export default function Films() {
  const { title } = useParams();

  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState(null);

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      try {
        if (title) {
          const data = await getFilmByTitle(title);
          setFilm(data);
          setFilms([]);
        } else {
          const data = await getFilms();
          setFilms(data);
          setFilm(null);
          setPage(0); 
        }
      } catch (e) {
        setError(e?.message || "Error fetching films");
      } finally {
        setLoading(false);
      }
    })();
  }, [title]);

  async function handleSearch(filters) {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`/api/films/search?${params.toString()}`);
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setFilms(data);

      // reset pagination after search
      setPage(0);
    } catch (e) {
      setError(e?.message || "Error searching films");
    } finally {
      setLoading(false);
    }
  }

  
  if (loading) {
    return (
      <Box sx={{ p: 3, display: "grid", placeItems: "center", minHeight: 240 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>

        <Button
          component={RouterLink}
          to="/films"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Back to Films
        </Button>
      </Box>
    );
  }

  // ✅ DETAIL PAGE 
  if (title && film) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 980, mx: "auto" }}>
        <Button
          component={RouterLink}
          to="/films"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Films
        </Button>

        <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
          {/* Header */}
          <Box
            sx={{
              px: { xs: 2, md: 3 },
              py: { xs: 2, md: 2.5 },
              display: "flex",
              alignItems: "center",
              gap: 1.5
            }}
          >
            <MovieIcon />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                {film.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Film details
              </Typography>
            </Box>
          </Box>

          <Divider />

          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            {/* Metadata chips */}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
              {film.release_year && (
                <Chip
                  icon={<CalendarMonthIcon />}
                  label={`Release: ${film.release_year}`}
                  variant="outlined"
                />
              )}
              {film.rating && (
                <Chip
                  icon={<StarIcon />}
                  label={`Rating: ${film.rating}`}
                  variant="outlined"
                />
              )}
              {film.length && (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${film.length} min`}
                  variant="outlined"
                />
              )}
              {film.category && (
                <Chip
                  icon={<CategoryIcon />}
                  label={film.category}
                  variant="outlined"
                />
              )}
            </Stack>

            {/* Description */}
            <Paper variant="outlined" sx={{ p: 2.25, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Description
              </Typography>

              {film.description ? (
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  {film.description}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No description available.
                </Typography>
              )}
            </Paper>

            
          </CardContent>
        </Card>
      </Box>
    );
  }

  // ✅ LIST PAGE (same as you had, just Box instead of div)
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
        Films
      </Typography>

      <SearchBar onSearch={handleSearch} />

      <FilmsTable
        films={films}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
    </Box>
  );
}
