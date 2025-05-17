"use client";
import { Link } from "react-router-dom";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import AsssignCounselorsManager from "../../Dialogs/AssignCounselorsManager";
import { Handshake } from "lucide-react";
import { apiUrl } from "../../../utile/api";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    globalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      //rowSelection,
    },
  });

  const getSelectedRows = () => {
    // Retrieve all selected rows using `getSelectedRowModel()`
    const selectedRowsData = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    return selectedRowsData;
  };

  function globalFilter(rows, columnIds, filterValue) {
    const searchValue = filterValue.toLowerCase();
    return rows.filter((row) => {
      const email = row.values.email?.toLowerCase() || "";
      const fullname = row.values.fullname?.toLowerCase() || "";
      return email.includes(searchValue) || fullname.includes(searchValue);
    });
  }
  let token = localStorage.getItem("token");
  const [user, setuser] = useState([]);
  const CheckLogin = () => {
    if (token) {
      let a = jwtDecode(token);
      setuser(a);
      console.log("This is aa bb cc user");
      console.log(a)

    }
  }



  useEffect(() => {
    CheckLogin();

  }, [])
  return (
    <div>
      <div className="w-full mt-1 flex gap-2">

        <Button variant="outline" className="bg-teal-500 text-white">
          {" "}

          <Link to={"/addManager"}>Add  </Link>
        </Button>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by fullname or email..."
          value={
            table.getState().globalFilter || "" // Use global filtering for combined logic
          }
          onChange={
            (event) => table.setGlobalFilter(event.target.value) // Update the global filter
          }
          className="max-w-md"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                if (user.role !== 1) {
                  const userEmail = (user.email ?? '').trim();
                  const rowEmail = (row.original?.email ?? '').trim(); // Safely get row email

                  if (userEmail === rowEmail) {
                    return (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.column.id === "photo" ? (
                              <img
                                src={`${apiUrl}/image/${cell.getValue()}`}
                                alt="Photo"
                                className="w-16 h-16 rounded-[4rem] object-cover"
                              />
                            ) : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  }
                }
                return  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.column.id === "photo" ? (
                              <img
                                src={`${apiUrl}/image/${cell.getValue()}`}
                                alt="Photo"
                                className="w-16 h-16 rounded-[4rem] object-cover"
                              />
                            ) : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </TableCell>
                        ))}
                      </TableRow>; // Skip rendering if not matched or user.role === 1
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
