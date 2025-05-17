


"use client";
import { Upload } from "lucide-react";
import { Mail } from "lucide-react";
import { Handshake } from "lucide-react";
import { apiUrl } from "../../../utile/api";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

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

import { useState } from "react";
import { Link } from "react-router-dom";
import AsssignCounselorsManager from "../../Dialogs/AssignCounselorsManager";

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
      rowSelection,
    },
  });


  const getSelectedRows = () => {
    // Retrieve all selected rows using `getSelectedRowModel()`
    const selectedRowsData = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    return selectedRowsData;
  };


  const handleBulkUpload = () => {
    const selectedRows = getSelectedRows();
    if (selectedRows.length === 0) {
      alert("please Select Student ");
    }
    console.log("Selected Rows:", selectedRows);
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
        <AsssignCounselorsManager
          trigger={
            <Button variant="outline" className="bg-teal-500 text-white">
              {" "}
              <Handshake />
              Assigned Responsible to Manager
            </Button>
          }
          selectedStudents={getSelectedRows()}
        />
        <Button variant="outline" className="bg-teal-500 text-white">
          {" "}

          <Link to={"/addResponsible"}>Add Responsible </Link>
        </Button>

      </div>
      <div className="flex items-center justify-between py-4 gap-1">
        {/* <Input
          placeholder="Filter by emails..."
          value={table.getColumn("email")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-md"
        /> */}
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
        {/* <span>
          <Button
            variant="outline"
            className="bg-teal-500 text-white"
            onClick={handleBulkUpload}
          >
            {" "}
            <Upload />
            Bulk Upload
          </Button>
        </span> */}
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
                      </TableRow>
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
