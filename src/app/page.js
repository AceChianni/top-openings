// "use client";
// import AnimeOpeningsComponent from "../components/Anime";
// import { AnimeOpenings, Library } from "../utils/library";
// import { useState, useEffect } from "react";
// import { getAllDocuments } from "@/utils/firebaseUtils";
// import { db } from "../../firebase.config";

// export default function Home() {
//   const [library, setLibrary] = useState(
//     new Library("Codex January Cohort's Anime Openings", [])
//   );

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const documents = await getAllDocuments(db, "animeOpenings");

//         const animeOpeningInstances = documents.map((doc) => {
//           const animeOpening = new AnimeOpenings(
//             doc.title,
//             doc.artist,
//             doc.anime,
//             doc.userId // Assuming you have userId in your document
//           );
//           animeOpening.id = doc.id; // Assign the document ID to the anime opening instance
//           return animeOpening;
//         });

//         setLibrary(new Library(library.name, animeOpeningInstances));
//       } catch (error) {
//         console.error("Error fetching anime openings:", error);
//       }
//     }

//     fetchData();

//     return () => {
//       console.log("Anime page side effect cleanup");
//     };
//   }, []); // Ensure you have an empty dependency array to run this effect only once

//   return (
//     <main style={{ minHeight: "85vh" }}>
//       <h1 className="my-12 text-6xl text-center">
//         Codex&apos;s Anime Openings
//       </h1>
//       <h2 className="text-3xl text-center">
//         Discover the best anime openings!
//       </h2>

//       <div>
//         <h3 className="m-5 text-xl">Anime Openings List</h3>
//         <hr className="mx-5" />

//         {library.openings.length > 0 ? (
//           library.openings.map((animeOpening) => (
//             <AnimeOpeningsComponent
//               key={animeOpening.id}
//               id={animeOpening.id}
//               title={animeOpening.title}
//               artist={animeOpening.artist}
//               anime={animeOpening.anime}
//               userId={animeOpening.userId}
//               updateAnimeOpening={null} // Pass updateAnimeOpening function if needed
//               deleteAnimeOpening={null} // Pass deleteAnimeOpening function if needed
//               isManagementPage={false} // Adjust based on your requirements
//             />
//           ))
//         ) : (
//           <p className="text-center">
//             No anime openings available in the library.
//           </p>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";
import AnimeOpenings from "../components/AnimeOpenings"; // Updated import statement
import { AnimeOpenings as AnimeOpening, Library } from "../utils/library";
import { useState, useEffect } from "react";
import { getAllDocuments } from "@/utils/firebaseUtils";
import { db } from "../../firebase.config";

export default function Home() {
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

  return (
    <main style={{ minHeight: "85vh" }}>
      <h1 className="my-12 text-6xl text-center">Anime Openings Library</h1>

      <div>
        <h3 className="m-5 text-xl">Anime Openings List</h3>
        <hr className="mx-5" />

        {library.openings.map((opening) => (
          <AnimeOpenings
            key={opening.id}
            id={opening.id}
            title={opening.title}
            artist={opening.artist}
            anime={opening.anime}
            rank={opening.rank}
            // Include any necessary props here
          />
        ))}
      </div>
    </main>
  );
}
