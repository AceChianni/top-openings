"use client";

// import React, { useEffect, useState } from "react";
// import { getAnimeOpenings, deleteAnimeOpening } from "../utils/firebaseUtils";
// import AddAnimeForm from "./AddAnimeForm";

const Anime = ({ user }) => {
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOpenings();
    }
  }, [user]);

  const fetchOpenings = async () => {
    const data = await getAnimeOpenings(user.uid);
    setOpenings(data);
  };

  const handleDelete = async (id) => {
    await deleteAnimeOpening(id);
    fetchOpenings();
  };

  return (
    <div>
      <AddAnimeForm user={user} refreshOpenings={fetchOpenings} />
      <ul>
        {openings.map((opening) => (
          <li
            key={opening.id}
            className="mb-2 p-2 border rounded flex justify-between"
          >
            {opening.title} ({opening.anime})
            <button
              onClick={() => handleDelete(opening.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Anime;
