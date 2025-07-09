"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import "./header.css";
import WishlistCounter from "../wishlist/WishlistCounter";
import { useWishlist } from "@/context/WishlistContext";
import {useRouter} from "next/navigation";

const Header = () => {
  const { wishlistCount, wishlistItems, removeFromWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter(); // Add this line
  const handleSearchIconClick = () => {
    router.push("/?e_ser=t");
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`header ${
        isScrolled ? "scrolled" : menuOpen ? "menu-open" : ""
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* === Left Box: Logo Only === */}
          <div className="flex-shrink-0">
            <Link href="/" className="logo" onClick={closeMenu}>
              <span className="text-2xl font-bold">Logo</span>
            </Link>
          </div>

          {/* === Right Box: Nav + Icons + Flag + Mobile Toggle === */}
          <div className="flex items-center space-x-6">
            {/* Nav links (Desktop only) */}
            <nav className="hidden md:flex space-x-6 items-center">
              <Link href="/about" className="nav-link">
                About
              </Link>
              <Link href="/how-it-works" className="nav-link">
                How It Works
              </Link>
            </nav>

            {/* Icons (Desktop only) */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="icon-button" onClick={handleSearchIconClick}>
                <Search size={20} />
              </button>
              <WishlistCounter
                count={wishlistCount}
                wishlistItems={wishlistItems}
                onRemove={removeFromWishlist}
                onGenerateReport={() => {}}
                onGenerateAllReports={() => {}}
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

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-2xl focus:outline-none icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* === Mobile Nav === */}
        <div className={`md:hidden mobile-nav ${menuOpen ? "open mt-4" : ""}`}>
          <nav className="space-y-4">
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

            <div className="pt-4 flex items-center space-x-4">
              <button className="icon-button">
                <Search size={20} />
              </button>
              <WishlistCounter
                count={wishlistCount}
                wishlistItems={wishlistItems}
                onRemove={removeFromWishlist}
                onGenerateReport={() => {}}
                onGenerateAllReports={() => {}}
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
