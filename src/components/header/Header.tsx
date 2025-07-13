"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WishlistCounter from "../wishlist/WishlistCounter";
import { useWishlist } from "@/context/WishlistContext";
import "./header.css";

const Header = () => {
  const { wishlistCount, wishlistItems, removeFromWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

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
    <header className={`header ${isScrolled ? "scrolled" : menuOpen ? "menu-open" : ""}`}>
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold" onClick={closeMenu}>
            Logo
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/how-it-works" className="nav-link">How It Works</Link>
            </nav>

            {/* Icons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search Icon */}
              <button className="icon-button" onClick={() => router.push('/?e_ser=t')}>
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <WishlistCounter
                count={wishlistCount}
                wishlistItems={wishlistItems}
                onRemove={removeFromWishlist}
                onGenerateReport={() => { }}
                onGenerateAllReports={() => { }}
              />

              {/* Always-visible Flag */}
              <Image
                src="/flags/us.svg"
                alt="English"
                width={34}
                height={36}
                className="rounded "
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-2xl icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-10"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Navigation */}
        <div
          className={`md:hidden mobile-nav ${menuOpen ? "open z-20" : "hidden"}`}
          style={{ position: "fixed", top: 0, right: 0, left: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-2xl icon-button"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <nav className="space-y-4 p-4 bg-white shadow-lg rounded-b-lg">
            <Link href="/about" onClick={closeMenu} className="nav-link block">
              About
            </Link>
            <Link href="/how-it-works" onClick={closeMenu} className="nav-link block">
              How It Works
            </Link>

            {/* Mobile Search */}
            <button
              className="icon-button w-full flex items-center gap-2 justify-center border rounded py-2 mt-2"
              onClick={() => { closeMenu(); router.push('/doctorsearch?e_ser=t'); }}
            >
              <Search size={20} />
              <span>Search Doctors</span>
            </button>

            {/* Wishlist and Flag */}
            <div className="pt-4 flex items-center space-x-4">
              <WishlistCounter
                count={wishlistCount}
                wishlistItems={wishlistItems}
                onRemove={removeFromWishlist}
                onGenerateReport={() => { }}
                onGenerateAllReports={() => { }}
              />
              <Image
                src="/flags/us.svg"
                alt="English"
                width={28}
                height={28}
                className=" hover:scale-105 transition-transform duration-200"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
