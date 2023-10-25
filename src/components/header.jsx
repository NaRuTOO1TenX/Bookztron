import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

import { AiFillShopping, AiOutlineHeart } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { BsShop } from "react-icons/bs";
function Header({ isLogged, setIsLogged }) {
  const onLogout = () => {
    localStorage.removeItem("access_token");
    setIsLogged(false);
  };
  return (
    <header className="flex justify-between items-center py-6 px-[30px] flex-wrap gap-5 z-50 sticky top-0 bg-white border-b-2">
      <Link to={"/"} className="text-[#29517c] text-3xl">
        <h2>Bookztron</h2>
      </Link>
      <div>
        {isLogged ? (
          <div className="flex flex-wrap gap-5 items-center">
            <Button onClick={onLogout} className="bg-[#BD5D78]">
              Logout
            </Button>

            <Link
              to={"/shop"}
              className="rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px]"
            >
              {<BsShop className="text-white text-lg" />}
            </Link>
            <Link
              to={"/wishlist"}
              className="rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px]"
            >
              {<AiOutlineHeart className="text-white text-lg" />}
            </Link>
            <Link
              to={"/"}
              className="rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px]"
            >
              {<SlBasket className="text-white text-lg" />}
            </Link>
            <Link
              to={"/"}
              className="rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px]"
            >
              {<AiFillShopping className="text-white text-lg" />}
            </Link>
          </div>
        ) : (
          <Link to={"/login"} className="py-2 px-5 bg-[#BD5D78] text-white">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;

Header.propTypes = {
  isLogged: PropTypes.any,
  setIsLogged: PropTypes.func,
};
