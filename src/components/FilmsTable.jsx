import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

const columns = [
  { id: "title", label: "Title", minWidth: 200 },
  { id: "release_year", label: "Release Year", minWidth: 120 },
  { id: "category", label: "Category", minWidth: 160 },
];

export default function FilmsTable({
  films = [],
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const pagedFilms = films.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="films table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedFilms.map((film) => (
              <TableRow hover tabIndex={-1} key={film.film_id ?? film.title}>
                {columns.map((column) => {
                  const value = film[column.id];

                  if (column.id === "title") {
                    return (
                      <TableCell key={column.id}>
                        <Link
                          component={RouterLink}
                          to={`/films/${encodeURIComponent(value ?? "")}`}
                          underline="hover"
                          sx={{ fontWeight: 500, cursor: "pointer" }}
                        >
                          {value ?? ""}
                        </Link>
                      </TableCell>
                    );
                  }

                  return <TableCell key={column.id}>{value ?? ""}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={films.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}
