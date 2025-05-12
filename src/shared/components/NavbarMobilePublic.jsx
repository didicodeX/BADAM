import { useEffect, useState } from "react";
import { Menu, Search, X, ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import SearchInput from "./SearchInput";


export default function NavbarMobilePublic({
  menuOpen,
  setMenuOpen,
  forceOpenSearchOnMount = false,
}) {
  const [searchOpen, setSearchOpen] = useState(forceOpenSearchOnMount);
  useEffect(() => {
    if (forceOpenSearchOnMount) {
      sessionStorage.removeItem("badam:search:autoFocus");
    }
  }, [forceOpenSearchOnMount]);
  return (
    <header className="fixed top-0 left-0 w-full bg-background-50 padd-x py-3 shadow-sm  z-50 h-14">
      {!searchOpen ? (
        <div className="flex items-center justify-between">
          {menuOpen ? (
            <X
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 text-primary cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}

          <div className="text-xl font-bold">
            <Link to="/">
              BA<span className="text-cta-500">DAM</span>
            </Link>
          </div>

          <Search
            className="w-6 h-6 text-primary cursor-pointer"
            onClick={() => setSearchOpen(true)}
          />
        </div>
      ) : (
        <SearchInput
          mobile
          autoFocus={forceOpenSearchOnMount}
          onClose={() => setSearchOpen(false)}
        />      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-full left-0 w-2/3 h-[calc(100vh-56px)]  bg-background-50 border-t py-3 px-6 z-40 flex flex-col justify-between border-r border-r-text-100"
          >
            <nav className="space-y-4">
              <Link
                to="/login"
                className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
              >
                <LogIn className="w-5 h-5" />
                Se connecter
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-3 w-full hover:text-cta-500 rounded"
              >
                <UserPlus className="w-5 h-5" />
                S'inscrire
              </Link>
            </nav>

            <div>
              <p className="text-sm">Aide & FAQ </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
