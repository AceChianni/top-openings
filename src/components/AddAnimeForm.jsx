"use client";

import React, { useState } from "react";
import { addAnimeOpening } from "../utils/firebaseUtils";

const AddAnimeForm = ({ user, refreshOpenings }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [anime, setAnime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAnimeOpening({ title, artist, anime, userId: user.uid });
    refreshOpenings();
    setTitle("");
    setArtist("");
    setAnime("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Anime"
        value={anime}
        onChange={(e) => setAnime(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        Add Opening
      </button>
    </form>
  );
};

export default AddAnimeForm;
