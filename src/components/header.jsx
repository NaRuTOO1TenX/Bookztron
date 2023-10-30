import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

import { AiFillShopping, AiOutlineHeart } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { BsShop } from "react-icons/bs";
function Header({ isLogged, setIsLogged, wishList, cardList }) {
  const onLogout = () => {
    localStorage.removeItem("access_token");
    setIsLogged(false);
  };
  return (
    <header className="flex justify-between items-center py-6 px-[30px] flex-wrap gap-5 z-50 sticky top-0 bg-white border-b-2">
      <Link to={"/"} className="text-[#29517c] text-3xl">
        <h2>
          <b>Bookztron</b>
        </h2>
      </Link>
      <div>
        {isLogged ? (
          <div className="flex flex-wrap gap-5 items-center">
            <Button onClick={onLogout} className="bg-[#BD5D78] px-8">
              Logout
            </Button>

            <Link
              to={"/shop"}
              className="rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px] transition-all hover:bg-[#05475a]"
            >
              {<BsShop className="text-white text-lg" />}
            </Link>
            <Link
              to={"/wishlist"}
              className="rounded-full bg-[#0e7490] relative flex items-center justify-center w-[40px] h-[40px] transition-all hover:bg-[#05475a]"
            >
              {<AiOutlineHeart className="text-white text-lg" />}
              {wishList.length ? (
                <span
                  style={{ boxShadow: "0 0 2px #f3f3f3", fontSize: "10px" }}
                  className="absolute right-[-2px] top-[-3px] bg-[#f44336] w-[1.3rem] h-[1.3rem] text-white flex items-center justify-center rounded-full"
                >
                  {wishList.length}
                </span>
              ) : null}
            </Link>

            <Link
              to={"/cards"}
              className="relative rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px] transition-all hover:bg-[#05475a]"
            >
              {<SlBasket className="text-white text-lg" />}
              {cardList?.length ? (
                <span
                  style={{ boxShadow: "0 0 2px #f3f3f3", fontSize: "10px" }}
                  className="absolute right-[-2px] top-[-3px] bg-[#f44336] w-[1.3rem] h-[1.3rem] text-white flex items-center justify-center rounded-full"
                >
                  {cardList?.length}
                </span>
              ) : null}
            </Link>

            <Link
              to={"/order"}
              className="rounded-full bg-[#0e7490] flex items-center justify-center w-[40px] h-[40px] transition-all hover:bg-[#05475a]"
            >
              {<AiFillShopping className="text-white text-lg" />}
            </Link>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2 bg-[#BD5D78]"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;

Header.propTypes = {
  isLogged: PropTypes.bool,
  setIsLogged: PropTypes.func,
  wishList: PropTypes.array,
  cardList: PropTypes.array,
};
