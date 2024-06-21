import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import lightIcon from "./assets/9104141_sun_bright_brightness_light mode_icon.svg";
import darkIcon from "./assets/9104269_night_night mode_moon_crescent_dark mode_icon.svg";

const NavBar = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="flex align-middle justify-between mb-5 p-5">
      {/* dark light mode */}
      <div className="text-sm sm:text-lg mt-1 ">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-burgundy font-bold mr-3 text-xl" : "mr-3"
          }
          to="/"
        >
          Category
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-burgundy font-bold text-xl" : ""
          }
          to="/search"
        >
          Search
        </NavLink>
      </div>

      <div onClick={darkModeHandler} className={`w-6 md:w-8 cursor-pointer`}>
        {dark ? (
          <img src={lightIcon} alt="icon" className="dark:text-beige" />
        ) : (
          <img src={darkIcon} alt="icon" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
