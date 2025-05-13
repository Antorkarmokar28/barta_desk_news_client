"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaRss,
  FaYoutube,
} from "react-icons/fa";
import { Menu, X, Search, LogOut } from "lucide-react";
import Logo from "../logo/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";

const categories = [
  "Home",
  "World News",
  "National",
  "Financial",
  "Entertainment",
  "Lifestyle",
  "Technology",
  "Travel",
  "Sports",
  "Category",
  "Pages",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const { user, setIsLoading } = useUser();
  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formatted = date.toLocaleDateString("en-US", options);
    setCurrentDate(formatted);
  }, []);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
  };

  return (
    <header className="w-full">
      {/* Topbar */}
      <div className="bg-black text-white text-sm px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 flex-wrap">
            <span>Bangladesh</span>
            <span>📅 {currentDate}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>My Report</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogOut}>
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
                {"|"}
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
            <div className="flex gap-2 text-white text-lg">
              <Link href="https://www.facebook.com/">
                <FaFacebookF />
              </Link>
              <Link href="https://x.com/">
                <FaTwitter />
              </Link>
              <Link href="https://www.google.com/">
                <FaGooglePlusG />
              </Link>
              <Link href="#">
                <FaRss />
              </Link>
              <Link href="https://www.youtube.com/">
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Middle bar */}
      <div className="bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-4 py-6 bg-white flex-wrap gap-4">
            {/* logo */}
            <Logo />
            {/* advertisement */}
            <div className="w-[300px] md:w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-sm text-gray-600">
              728 x 90 ADVERTISEMENT
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}

      <nav className="bg-[#0060d1] text-white px-4 py-3 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 flex-wrap font-medium text-sm">
              {categories.map((cat) => (
                <Link key={cat} href="#" className="hover:underline">
                  {cat}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {/* Search Icon */}
            <div>
              <Search className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-3 space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href="#"
                  className="block text-sm hover:underline"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
