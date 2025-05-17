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

  return (
    <div>
      <div className="w-full mt-1 flex gap-2">

        <Button variant="outline" className="bg-teal-500 text-white">
          {" "}

          <Link to={"/Add-Exam-Mode"}>Add  </Link>
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
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "photo" ? (
                        <>
                          <img
                            src={`${apiUrl}/image/${cell.getValue()}`} // Assuming the cell value contains the image URL
                            alt="Photo"
                            className="w-16 h-16 rounded-[4rem] object-cover" // Adjust styles as needed
                          />
                        </>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
