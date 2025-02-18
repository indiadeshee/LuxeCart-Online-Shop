import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faPlus,
  faFileImport,
  faSearch,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

function Inventory() {
  const [data] = useState(() =>
    [...Array(50)].map((_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      sku: `SKU${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      category: ['Electronics', 'Fashion', 'Home & Living'][
        Math.floor(Math.random() * 3)
      ],
      price: (Math.random() * 1000 + 10).toFixed(2),
      stock: Math.floor(Math.random() * 1000),
      status: ['In Stock', 'Low Stock', 'Out of Stock'][
        Math.floor(Math.random() * 3)
      ],
    }))
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Product Name',
        accessor: 'name',
      },
      {
        Header: 'SKU',
        accessor: 'sku',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => (
          <span
            className={`badge ${
              value === 'In Stock'
                ? 'badge-success'
                : value === 'Low Stock'
                ? 'badge-warning'
                : 'badge-danger'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: 'Actions',
        Cell: () => (
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="text-red-600 hover:text-red-800">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <FontAwesomeIcon icon={faFileImport} className="mr-2" />
            Import
          </button>
          <button className="btn-primary">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-10"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="input-field w-auto"
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>

        <div className="table-container">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="group"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{column.render('Header')}</span>
                        <span className="text-gray-400">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon icon={faSortDown} />
                            ) : (
                              <FontAwesomeIcon icon={faSortUp} />
                            )
                          ) : (
                            <FontAwesomeIcon
                              icon={faSort}
                              className="opacity-0 group-hover:opacity-100"
                            />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Page {pageIndex + 1} of {pageOptions.length}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="btn-secondary"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
