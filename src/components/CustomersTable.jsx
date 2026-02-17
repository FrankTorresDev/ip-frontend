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
  { id: "name", label: "Name", minWidth: 200 },
  { id: "email", label: "Email", minWidth: 120 },
];

export default function CustomersTable({
  customers = [],
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const pagedCustomers = customers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="customers table">
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
            {pagedCustomers.map((customer) => (
              <TableRow hover tabIndex={-1} key={customer.customer_id ?? `${customer.email ?? ""}-${customer.name ?? ""}`}>
                {columns.map((column) => {
                  const value = customer[column.id];

                  // Make NAME clickable to a customer detail route
                  if (column.id === "name") {
                    return (
                      <TableCell key={column.id}>
                        <Link
                          component={RouterLink}
                          to={`/customers/${customer.first_name}${customer.last_name}`}
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
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}
