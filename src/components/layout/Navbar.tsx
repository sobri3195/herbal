
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, BookOpen, Coffee, Heart, Beaker, LogIn, User, ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

// Konfigurasi tautan navigasi
const navLinks = [
  { name: "Beranda", path: "/", icon: <Leaf className="w-5 h-5" /> },
  { name: "Ensiklopedia", path: "/encyclopedia", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Peracik Herbal", path: "/mixer", icon: <Beaker className="w-5 h-5" /> },
  { name: "Ramuan", path: "/remedies", icon: <Heart className="w-5 h-5" /> },
  { name: "Persiapan", path: "/preparation", icon: <Coffee className="w-5 h-5" /> },
  { name: "Toko", path: "/store", icon: <Store className="w-5 h-5" /> },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0); // In a real app, this would come from a cart context
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo dan merek */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-herb-primary" />
              <span className="ml-2 text-xl font-nunito font-bold text-herb-primary">
                <span>Herbal</span>
                <span className="text-herb-secondary">Alchemy</span>
              </span>
            </Link>
          </div>
          
          {/* Navigasi desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path 
                    ? "text-herb-primary bg-herb-light" 
                    : "text-gray-600 hover:text-herb-primary hover:bg-herb-light/50"
                )}
              >
                {link.icon}
                <span className="ml-1.5">{link.name}</span>
              </Link>
            ))}
            
            {/* Cart link */}
            <Link to="/cart" className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-herb-primary hover:bg-herb-light/50 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-herb-primary text-white text-[10px]">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            
            {user ? (
              <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                <Button 
                  variant="default" 
                  className="ml-4 bg-herb-primary hover:bg-herb-primary/90"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user.role === "admin" ? "Admin" : "Akun"}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="ml-4 border-herb-primary text-herb-primary hover:bg-herb-light hover:text-herb-primary"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Tombol menu mobile */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="mr-2 relative">
              <Button size="sm" variant="ghost">
                <ShoppingCart className="h-5 w-5 text-herb-primary" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-herb-primary text-white text-[10px]">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {user && (
              <Link to={user.role === "admin" ? "/admin" : "/dashboard"} className="mr-2">
                <Button size="sm" variant="ghost">
                  <User className="h-5 w-5 text-herb-primary" />
                </Button>
              </Link>
            )}
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-md text-herb-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigasi mobile */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path 
                    ? "text-herb-primary bg-herb-light" 
                    : "text-gray-600 hover:text-herb-primary hover:bg-herb-light/50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            ))}
            
            <div className="pt-2">
              {user ? (
                <Link to={user.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="default"
                    className="w-full justify-center bg-herb-primary hover:bg-herb-primary/90"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {user.role === "admin" ? "Admin" : "Akun"}
                  </Button>
                </Link>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-center border-herb-primary text-herb-primary hover:bg-herb-light"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
