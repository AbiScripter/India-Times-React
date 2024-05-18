import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import lightIcon from "../assets/9104141_sun_bright_brightness_light mode_icon.svg";
import darkIcon from "../assets/9104269_night_night mode_moon_crescent_dark mode_icon.svg";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
  return (
    <div>
      {/* dark light mode */}
      <div
        onClick={darkModeHandler}
        className={`w-6 md:w-8 absolute right-5 top-5`}
      >
        {dark ? (
          <img src={lightIcon} alt="icon" className="dark:text-beige" />
        ) : (
          <img src={darkIcon} alt="icon" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
