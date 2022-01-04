import React, { useState, useRef } from "react";
import ThemeToggle from "components/ThemeToggle";
import AvatarImg from "assets/images/avatar.png";
import { ReactComponent as ReactLogo } from "logo.svg";
import { useAuth } from "contexts/auth-context";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useOnClickOutside(dropdownRef, () => {
    if (showDropdown) setShowDropdown(false);
  });

  const handleSignOut = async () => {
    if (currentUser)
      await updateDoc(doc(db, "users", currentUser.uid), {
        isOnline: false,
      });
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 flex items-center w-full px-4 py-2 bg-white shadow-lg dark:bg-secondary-dark sm:relative">
      <button type="button" onClick={() => navigate("/")}>
        <ReactLogo className="w-20" />
      </button>
      <div>
        <h2 className="font-bold">React Chat App</h2>
        <p className="font-extralight">by @totoz</p>
      </div>
      <div className="relative flex ml-auto">
        <ThemeToggle />
        <button type="button" onClick={() => setShowDropdown((prevState) => !prevState)}>
          <img src={currentUser?.photoURL || AvatarImg} alt="Profile Avatar" className="w-12 rounded-full" />
        </button>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-secondary-dark w-44 top-14"
          >
            <div className="px-4 py-3">
              <span className="block text-sm">{currentUser?.displayName}</span>
              <span className="block text-sm truncate font-extralight">{currentUser?.email}</span>
            </div>
            <ul className="py-1">
              <li>
                <button
                  className="w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                  type="button"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
