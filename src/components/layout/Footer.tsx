
import React from "react";
import { Link } from "react-router-dom";
import { Github, Mail, Heart, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-herb-light/50 border-t border-herb-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Bagian merek */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Leaf className="h-6 w-6 text-herb-primary" />
              <span className="ml-2 text-lg font-nunito font-bold text-herb-primary">
                <span>Herbal</span>
                <span className="text-herb-secondary">Alchemy</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Temukan kekuatan pengobatan herbal dengan platform interaktif kami.
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://github.com/sobri3195" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-herb-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="mailto:muhammadsobrimaulana31@gmail.com"
                className="text-gray-500 hover:text-herb-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Tautan cepat */}
          <div>
            <h3 className="text-sm font-semibold text-herb-dark uppercase tracking-wider">
              Fitur
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/mixer" className="text-gray-600 hover:text-herb-primary text-sm">
                  Peracik Herbal
                </Link>
              </li>
              <li>
                <Link to="/encyclopedia" className="text-gray-600 hover:text-herb-primary text-sm">
                  Ensiklopedia
                </Link>
              </li>
              <li>
                <Link to="/remedies" className="text-gray-600 hover:text-herb-primary text-sm">
                  Ramuan
                </Link>
              </li>
              <li>
                <Link to="/preparation" className="text-gray-600 hover:text-herb-primary text-sm">
                  Metode Persiapan
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Sumber daya */}
          <div>
            <h3 className="text-sm font-semibold text-herb-dark uppercase tracking-wider">
              Sumber Daya
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-herb-primary text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/scientific-references" className="text-gray-600 hover:text-herb-primary text-sm">
                  Referensi Ilmiah
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-herb-primary text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="https://lynk.id/muhsobrimaulana" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-herb-primary text-sm">
                  Dukung Kami
                </a>
              </li>
            </ul>
          </div>
          
          {/* Berlangganan */}
          <div>
            <h3 className="text-sm font-semibold text-herb-dark uppercase tracking-wider">
              Berlangganan untuk pembaruan
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Berita herbal terbaru, artikel, dan sumber daya dikirim langsung ke kotak masuk Anda.
            </p>
            <form className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="email-address" className="sr-only">
                  Alamat email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="herb-input w-full"
                  placeholder="Masukkan email Anda"
                />
                <button
                  type="submit"
                  className="herb-button-primary whitespace-nowrap"
                >
                  Berlangganan
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bagian bawah */}
        <div className="mt-12 border-t border-herb-light pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Muhammad Sobri Maulana. Hak Cipta Dilindungi.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center">
            <span className="text-sm text-gray-500">Dibuat dengan</span>
            <Heart className="mx-1 h-4 w-4 text-red-500" />
            <span className="text-sm text-gray-500">oleh</span>
            <a 
              href="https://github.com/sobri3195" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-sm text-herb-primary hover:underline"
            >
              Muhammad Sobri Maulana
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
