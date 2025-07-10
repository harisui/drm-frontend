"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./header.css";
import WishlistCounter from "../wishlist/WishlistCounter";
import { useWishlist } from "@/context/WishlistContext";

const Header = () => {
  const { wishlistCount, wishlistItems, removeFromWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Detect scroll and Esc key
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Auto-focus search input when shown
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  // Close search input on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSearch &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?query=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : menuOpen ? "menu-open" : ""
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="flex items-center justify-between h-16">
          {/* === Logo === */}
          <div className="flex-shrink-0">
            <Link href="/" className="logo" onClick={closeMenu}>
              <span className="text-2xl font-bold">Logo</span>
            </Link>
          </div>

          {/* === Navigation === */}
          <div className="flex items-center space-x-6">
            {/* Desktop nav links */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/how-it-works" className="nav-link">
                How It Works
              </Link>
            </nav>

            {/* Icons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search icon */}
              <button
                className="icon-button"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={20} />
              </button>

              {/* Search input (shown when toggled) */}
              {showSearch && (
                <form
                  ref={searchBoxRef}
                  onSubmit={handleSearchSubmit}
                  className="relative"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="border rounded px-3 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#333]"
                    placeholder="Search doctors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              )}

              <WishlistCounter
                count={wishlistCount}
                wishlistItems={wishlistItems}
                onRemove={removeFromWishlist}
                onGenerateReport={() => { }}
                onGenerateAllReports={() => { }}
              />

              <div className="language-selector relative">
                <button className="lang-button">
                  <Image
                    src="/flags/us.svg"
                    alt="English"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </button>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-2xl focus:outline-none icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-10"
            onClick={closeMenu}
          />
        )}

        {/* Mobile nav */}
        <div
          className={`md:hidden mobile-nav ${menuOpen ? "open z-20" : "hidden"}`}
          style={{ position: 'fixed', top: 0, right: 0, left: 0 }}
        >
          {/* Close icon for mobile menu */}
          <button
            className="absolute top-4 right-4 text-2xl icon-button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <nav className="space-y-4 p-4 pb-4 bg-white shadow-lg rounded-b-lg">
            <Link href="/about" onClick={closeMenu} className="nav-link block">
              About
            </Link>
            <Link
              href="/how-it-works"
              onClick={closeMenu}
              className="nav-link block"
            >
              How It Works
            </Link>

            {/* Mobile search */}
            <form
              onSubmit={handleSearchSubmit}
              action="#"
              className="pt-2 flex items-center space-x-2"
            >
              <input
                type="text"
                className="border rounded px-3 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#333]"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="icon-button">
                <Search size={20} />
              </button>
            </form>

            <div className="pt-4 flex items-center space-x-4">
              <WishlistCounter
                count={wishlistCount}
                wishlistItems={wishlistItems}
                onRemove={removeFromWishlist}
                onGenerateReport={() => { }}
                onGenerateAllReports={() => { }}
              />
              <div className="language-selector relative">
                <button className="lang-button">
                  <Image
                    src="/flags/us.svg"
                    alt="English"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
