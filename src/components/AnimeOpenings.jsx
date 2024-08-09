"use client";
import React, { useState } from "react";
import { AnimeOpening } from "@/utils/library";
import { addDocument } from "@/utils/firebaseUtils";

export default function AnimeOpenings({
  id,
  rank,
  title,
  artist,
  anime,
  updateAnimeOpening,
  deleteAnimeOpening,
  isManagementPage,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [updatedAnimeOpening, setUpdatedAnimeOpening] = useState({
    title,
    artist,
    anime,
    rank,
  });

  function handleUpdateFormSubmit(e) {
    e.preventDefault();

    const newAnimeOpening = new AnimeOpening(
      updatedAnimeOpening.title,
      updatedAnimeOpening.artist,
      updatedAnimeOpening.anime,
      updatedAnimeOpening.rank
    );
    newAnimeOpening.id = id;
    console.log(newAnimeOpening);

    setUpdatedAnimeOpening(newAnimeOpening);

    updateAnimeOpening(newAnimeOpening);
    setIsEditing(false);
  }

  return (
    <div className="flex justify-between p-5 m-5 border border-black rounded-md bg-emerald-500">
      {isEditing ? (
        <form
          onSubmit={handleUpdateFormSubmit}
          className="flex justify-between w-full"
        >
          <div className="">
            <input
              className="block p-1 border rounded border-emerald-600"
              placeholder="Title"
              type="text"
              name="title"
              id="title-input"
              required
              value={updatedAnimeOpening.title}
              onChange={(e) =>
                setUpdatedAnimeOpening({
                  ...updatedAnimeOpening,
                  title: e.target.value,
                })
              }
            />
            <input
              className="block p-1 border rounded border-emerald-600"
              placeholder="Artist"
              type="text"
              name="artist"
              id="artist-input"
              required
              value={updatedAnimeOpening.artist}
              onChange={(e) =>
                setUpdatedAnimeOpening({
                  ...updatedAnimeOpening,
                  artist: e.target.value,
                })
              }
            />
            <input
              className="block p-1 border rounded border-emerald-600"
              placeholder="Anime"
              type="text"
              name="anime"
              id="anime-input"
              required
              value={updatedAnimeOpening.anime}
              onChange={(e) =>
                setUpdatedAnimeOpening({
                  ...updatedAnimeOpening,
                  anime: e.target.value,
                })
              }
            />
            <input
              className="block p-1 border rounded border-emerald-600"
              placeholder="Rank"
              type="number"
              name="rank"
              min={1}
              required
              value={updatedAnimeOpening.rank}
              onChange={(e) =>
                setUpdatedAnimeOpening({
                  ...updatedAnimeOpening,
                  rank: e.target.value,
                })
              }
            />
          </div>
          <button
            className="p-2 my-4 border rounded border-emerald-500 hover:bg-emerald-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <div>
            <p className="my-1">Title: {title}</p>
            <p className="my-1">Artist: {artist}</p>
            <p className="my-1">Anime: {anime}</p>
            <p className="my-1">Rank: {rank}</p>
          </div>
          {isManagementPage && (
            <div>
              <button
                onClick={() => setIsEditing(true)}
                title="Edit this Anime Opening"
                className="p-2 my-4 rounded border-emerald-900 hover:bg-emerald-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button
                onClick={() => deleteAnimeOpening(id)}
                title="Delete this Anime Opening"
                className="p-2 my-4 rounded border-emerald-900 hover:bg-emerald-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-red-700 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
