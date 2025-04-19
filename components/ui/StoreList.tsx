import React from "react";

interface Store {
  id: number;
  name: string;
  city: string;
}

interface StoresListProps {
  sortBy?: string;
  location?: string;
  page: number;
  pageSize: number;
}

// Example data; replace with your fetch logic
const allStores: Store[] = [
  { id: 1, name: "Thobe Store A", city: "Dhahran" },
  { id: 2, name: "Thobe Store B", city: "Riyadh" },
  /* more items */
];

export default function StoresList({ sortBy, location, page, pageSize }: StoresListProps) {
  // filter
  let filtered = allStores.filter((s) =>
    (!location || s.city.toLowerCase() === location.toLowerCase())
  );

  // sort
  if (sortBy === "name_asc") {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name_desc") {
    filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  // pagination
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  // expose total count for Pagination
  StoresList.totalCount = filtered.length;

  return (
    <ul className="space-y-4">
      {paged.map((store) => (
        <li key={store.id} className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">{store.name}</h3>
          <p className="text-sm text-gray-600">{store.city}</p>
        </li>
      ))}
      {paged.length === 0 && <li>No stores found.</li>}
    </ul>
  );
}