"use client";
import React, { useState, useEffect } from "react";
import AnimeOpenings from "@/components/AnimeOpenings";
import { AnimeOpenings as AnimeOpening, Library } from "@/utils/library";
import {
  getAllDocuments,
  addDocument,
  updateDocument,
} from "@/utils/firebaseUtils";
import { db } from "../../../firebase.config";

export default function ManagementPage() {
  const [library, setLibrary] = useState(
    new Library("Anime Openings Library", [])
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const documents = await getAllDocuments(db, "animeOpenings");
        const animeOpeningInstances = documents.map((doc) => {
          const animeOpening = new AnimeOpening(
            doc.title,
            doc.artist,
            doc.anime,
            doc.rank
          );
          animeOpening.id = doc.id; // Set id from Firestore document
          return animeOpening;
        });
        setLibrary(new Library(library.name, animeOpeningInstances));
      } catch (error) {
        console.log("Failed fetching data", error);
      }
    }

    fetchData();
    return () => {
      console.log("get all docs cleanup");
    };
  }, []);

  function handleAddAnimeOpening(e) {
    e.preventDefault();
    const newAnimeOpening = new AnimeOpening(
      e.target.title.value,
      e.target.artist.value,
      e.target.anime.value,
      parseInt(e.target.rank.value)
    );

    // Add new document to Firestore
    addDocument(db, "animeOpenings", {
      title: e.target.title.value,
      artist: e.target.artist.value,
      anime: e.target.anime.value,
      rank: parseInt(e.target.rank.value),
    });

    const newLibrary = new Library(library.name, library.openings);
    newLibrary.addOpening(newAnimeOpening);
    setLibrary(newLibrary);
  }

  async function updateAnimeOpening(animeOpeningToUpdate) {
    const animeOpeningObj = {
      title: animeOpeningToUpdate.title,
      artist: animeOpeningToUpdate.artist,
      anime: animeOpeningToUpdate.anime,
      rank: animeOpeningToUpdate.rank,
    };

    await updateDocument(
      db,
      "animeOpenings",
      animeOpeningToUpdate.id,
      animeOpeningObj
    );

    const newOpenings = library.openings.map((opening) =>
      opening.id === animeOpeningToUpdate.id ? animeOpeningToUpdate : opening
    );

    const newLibrary = new Library(library.name, newOpenings);
    setLibrary(newLibrary);
  }

  function deleteAnimeOpening(id) {
    // Handle delete logic
    const newLibrary = new Library(
      library.name,
      library.openings.filter((opening) => opening.id !== id)
    );
    setLibrary(newLibrary);
  }

  return (
    <div>
      <h1 className="my-12 text-6xl text-center">Management Page</h1>

      <form
        onSubmit={handleAddAnimeOpening}
        className="p-5 m-5 border border-emerald-800"
      >
        <h2 className="mb-2 text-2xl">Add an Anime Opening</h2>
        <div>
          <input
            className="w-1/4 p-1 border rounded border-emerald-600"
            placeholder="Title"
            type="text"
            name="title"
            required
          />
          <input
            className="w-1/4 p-1 border rounded border-emerald-600"
            placeholder="Artist"
            type="text"
            name="artist"
            required
          />
          <input
            className="w-1/4 p-1 border rounded border-emerald-600"
            placeholder="Anime"
            type="text"
            name="anime"
            required
          />
          <input
            className="w-1/4 p-1 border rounded border-emerald-600"
            placeholder="Rank"
            type="number"
            name="rank"
            min={1}
            required
          />
        </div>
        <button
          className="p-2 my-4 border rounded border-emerald-500 hover:bg-emerald-600"
          type="submit"
        >
          Submit
        </button>
      </form>

      {library.openings.map((opening) => (
        <AnimeOpenings
          key={opening.id}
          id={opening.id}
          title={opening.title}
          artist={opening.artist}
          anime={opening.anime}
          rank={opening.rank}
          updateAnimeOpening={updateAnimeOpening}
          deleteAnimeOpening={deleteAnimeOpening}
          isManagementPage={true}
        />
      ))}
    </div>
  );
}
