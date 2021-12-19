import React, { useState, useRef } from "react";
import AvatarImg from "assets/images/avatar.png";
import { ReactComponent as ReactLogo } from "logo.svg";
import { useAuth } from "contexts/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "fb/index";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "hooks/useOnClickOutside";

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useOnClickOutside(dropdownRef, () => {
    if (showDropdown) setShowDropdown(false);
  });

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center bg-white shadow-xl py-2 px-4">
      <ReactLogo className="w-20" />
      <div>
        <h2 className="font-bold">React Chat App</h2>
        <p className="font-extralight">by @totoz</p>
      </div>
      <div className="flex ml-auto relative">
        <button type="button" onClick={() => setShowDropdown((prevState) => !prevState)}>
          <img src={AvatarImg} alt="Profile Avatar" className="w-12" />
        </button>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow absolute right-0 top-14"
          >
            <div className="py-3 px-4 text-gray-900">
              <span className="block text-sm">{currentUser?.displayName}</span>
              <span className="block text-sm font-extralight truncate">{currentUser?.email}</span>
            </div>
            <ul className="py-1">
              <li>
                <button
                  className="w-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
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
