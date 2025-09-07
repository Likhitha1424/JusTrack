import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
  FiCalendar,
  FiMoreHorizontal,
  FiChevronDown,
} from "react-icons/fi";
import { FaCircle, FaCheckSquare, FaRegSquare } from "react-icons/fa";

const dummyData = [
  { id: "#CM9801", user: "Natali Craig", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: "#CM9802", user: "Kate Morrison", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: "#CM9803", user: "Drew Cano", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: "#CM9804", user: "Orlando Diggs", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Approved", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: "#CM9805", user: "Andi Lane", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: "#CM9806", user: "Lana Rhoades", project: "UI/UX Redesign", address: "Forest Hills", date: "2 days ago", status: "In Progress", avatar: "https://i.pravatar.cc/40?img=6" },
  { id: "#CM9807", user: "John Doe", project: "Website Revamp", address: "123 Main St", date: "3 days ago", status: "Complete", avatar: "https://i.pravatar.cc/40?img=7" },
  { id: "#CM9808", user: "Jane Smith", project: "Mobile App", address: "456 Oak Ave", date: "4 days ago", status: "Pending", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: "#CM9809", user: "Peter Parker", project: "Ecommerce Site", address: "789 Pine Ln", date: "1 week ago", status: "Approved", avatar: "https://i.pravatar.cc/40?img=9" },
  { id: "#CM9810", user: "Bruce Wayne", project: "Security Audit", address: "Batcave", date: "1 week ago", status: "Rejected", avatar: "https://i.pravatar.cc/40?img=10" },
];

const statusColors = {
  "In Progress": { text: "text-blue-400" },
  Complete: { text: "text-green-400" },
  Pending: { text: "text-yellow-400" },
  Approved: { text: "text-emerald-400" },
  Rejected: { text: "text-red-400" },
};

export default function Projects() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const [filterStatus, setFilterStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    let data = dummyData.filter(
      (item) =>
        (item.user.toLowerCase().includes(search.toLowerCase()) ||
          item.project.toLowerCase().includes(search.toLowerCase()) ||
          item.id.toLowerCase().includes(search.toLowerCase())) &&
        (filterStatus ? item.status === filterStatus : true)
    );

    if (sortBy === "user") {
      data = [...data].sort((a, b) =>
        sortDir === "asc"
          ? a.user.localeCompare(b.user)
          : b.user.localeCompare(a.user)
      );
    } else if (sortBy === "date") {
      data = [...data].sort((a, b) => {
        const dateA = new Date(a.date.replace("Just now", new Date()).replace("A minute ago", new Date(Date.now() - 60000)).replace("Yesterday", new Date(Date.now() - 86400000)).replace(/(\d+) hour ago/g, (_, h) => new Date(Date.now() - h * 3600000)).replace(/(\d+) days ago/g, (_, d) => new Date(Date.now() - d * 86400000)).replace(/(\d+) week ago/g, (_, w) => new Date(Date.now() - w * 7 * 86400000)));
        const dateB = new Date(b.date.replace("Just now", new Date()).replace("A minute ago", new Date(Date.now() - 60000)).replace("Yesterday", new Date(Date.now() - 86400000)).replace(/(\d+) hour ago/g, (_, h) => new Date(Date.now() - h * 3600000)).replace(/(\d+) days ago/g, (_, d) => new Date(Date.now() - d * 86400000)).replace(/(\d+) week ago/g, (_, w) => new Date(Date.now() - w * 7 * 86400000)));

        return sortDir === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return data;
  }, [search, filterStatus, sortBy, sortDir]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaginationRange = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) end = Math.min(totalPages, 5);
    else if (currentPage > totalPages - 2) start = Math.max(1, totalPages - 4);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === paginatedData.length) {
      setSelectedItems(new Set());
    } else {
      const newSelected = new Set(paginatedData.map((item) => item.id));
      setSelectedItems(newSelected);
    }
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedItems(newSelected);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 font-[Poppins] text-gray-900 dark:text-gray-100">
      <div className="flex flex-col mb-3">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>

        <div className="flex items-center justify-between mb-4 p-3 rounded-md shadow-md bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md  dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
              <FiPlus className="text-gray-700 dark:text-gray-300" size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 rounded-md  dark:bg-gray-700  dark:border-gray-600 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
                title="Filter"
              >
                <FiFilter className="text-gray-700 dark:text-gray-300" size={18} />
              </button>
              {showFilter && (
                <div className="absolute mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => setFilterStatus("")}
                    className="block w-full text-left px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    All
                  </button>
                  {Object.keys(statusColors).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setShowFilter(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-black dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleSort("date")}
              className="p-2 rounded-md  dark:bg-gray-700  dark:border-gray-600 hover:bg-blue-200 dark:hover:bg-gray-600 transition"
              title={`Sort by Date ${sortBy === 'date' && sortDir === 'asc' ? '(Ascending)' : sortBy === 'date' && sortDir === 'desc' ? '(Descending)' : ''}`}
            >
              <FiChevronDown className="text-gray-700 dark:text-gray-300" size={18} />
            </button>
          </div>

          <div className="relative w-64">
            <FiSearch
              className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md  dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto"> 
        <table className="min-w-full text-sm ">
          <thead className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-semibold">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap">
                <button onClick={handleSelectAll} aria-label="Select All">
                  {selectedItems.size === paginatedData.length &&
                  paginatedData.length > 0 ? (
                    <FaCheckSquare className="text-gray-900 dark:text-gray-100" />
                  ) : (
                    <FaRegSquare className="text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </th>
              <th className="py-3 px-4 text-start whitespace-nowrap cursor-pointer" onClick={() => handleSort("id")}>Order ID</th>
              <th className="py-3 px-4 text-start whitespace-nowrap cursor-pointer" onClick={() => handleSort("user")}>User</th>
              <th className="py-3 px-4 text-start whitespace-nowrap">Project</th>
              <th className="py-3 px-4 text-start whitespace-nowrap">Address</th>
              <th className="py-3 px-4 text-start whitespace-nowrap cursor-pointer" onClick={() => handleSort("date")}>Date</th>
              <th className="py-3 px-4 text-start whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-start whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                // Only row borders for separation now
                className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-default"
                onMouseEnter={() => setHoveredRow(item.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  <button
                    onClick={() => handleSelectItem(item.id)}
                    aria-label={`Select ${item.id}`}
                  >
                    {selectedItems.has(item.id) ? (
                      <FaCheckSquare className="text-gray-900 dark:text-gray-100" />
                    ) : (
                      <FaRegSquare className="text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                </td>
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.avatar}
                      alt={item.user}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{item.user}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{item.project}</td>
                <td className="py-3 px-4 relative">
                  <div className="flex items-center space-x-2">
                    <span>{item.address}</span>
                    <button
                      onClick={() => copyToClipboard(item.address)}
                      className={`p-1 rounded ${
                        hoveredRow === item.id ? "visible" : "invisible"
                      } hover:bg-gray-200 dark:hover:bg-gray-600 transition`}
                      aria-label={`Copy address for ${item.id}`}
                    >
                      <FiCopy className="text-gray-600 dark:text-gray-300" size={14} />
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <FiCalendar className="text-gray-400 dark:text-gray-500" size={14} />
                    <span>{item.date}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div
                    className={`inline-flex items-center space-x-2 font-semibold rounded-full px-3 py-1 text-xs ${statusColors[item.status].text}`}
                  >
                    <FaCircle size={8} />
                    <span>{item.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <FiMoreHorizontal
                    className="cursor-pointer text-gray-700 dark:text-gray-300"
                    size={18}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clipboard Notification */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded shadow-lg z-50">
          Copied to clipboard!
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end items-center space-x-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition"
        >
          <FiChevronLeft className="text-gray-700 dark:text-gray-300" />
        </button>

        {getPaginationRange().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-3 py-1 rounded border transition ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 transition"
        >
          <FiChevronRight className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}