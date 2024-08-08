import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anime Openings",
  description: "A top anime openings management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-100 bg-emerald-800">
          <nav className="flex justify-center w-100 ">
            <Link
              className="m-1 text-emerald-300 hover:text-emerald-600"
              href="/"
            >
              Home
            </Link>
            <Link
              className="m-1 text-emerald-300 hover:text-emerald-600"
              href="/management"
            >
              Manage Library
            </Link>
            <Link
              className="m-1 text-emerald-300 hover:text-emerald-600"
              href="/about"
            >
              About
            </Link>
          </nav>
        </header>
        {children}
        <footer className="text-center">&copy; Ace July Capstone</footer>
      </body>
    </html>
  );
}

// import React from "react";
// import RegisterForm from "../components/RegisterForm";
// import { Html } from "next/document";

// const HomePage = () => {
//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl mb-4">Welcome to Anime Openings</h1>
//       {/* <LoginForm />
//       <RegisterForm /> */}
//     </div>
//   );
// };

// export default HomePage;
