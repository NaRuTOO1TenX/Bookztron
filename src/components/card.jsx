import PropTypes from "prop-types";
import { badgeVariants } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";

import { AiTwotoneStar } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function Card({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  _id,
  genre,
  rating,
  isLiked,
  handleLikeBtnClick,
  isLogged,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    handleLikeBtnClick(_id);
  };
  return (
    <div
      className="transition-all w-[250px] px-4  border border-gray-200 cursor-pointer p-1 text-center relative hover:shadow-2xl hover:scale-105"
      onClick={() => navigate("/product/" + _id)}
    >
      <span
        className={`${badgeVariants({
          variant: "destructive",
        })} absolute top-0 left-0 rounded-none`}
      >
        {badgeText}
      </span>
      {isLogged ? (
        <>
          <span
            onClick={handleClick}
            className="absolute top-2 right-2 rounded-none"
          >
            {!isLiked ? (
              <span className="flex transition-all items-center justify-center w-9 h-9 rounded-full hover:bg-[#e4e4e4] active:bg-[#f3f3f3]">
                {<AiFillHeart className="text-red-600 text-2xl" />}
              </span>
            ) : (
              <span className="flex transition-all items-center justify-center w-9 h-9 rounded-full text-[#bd5d78] hover:bg-[#bd5d78] hover:text-[#fff] active:bg-[#f3f3f3] active:text-[#bd5d78]">
                {<AiOutlineHeart className="text-2xl" />}
              </span>
            )}
          </span>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={handleClick}
            className="absolute top-2 right-2 rounded-none"
          >
            {!isLiked ? (
              <>{<AiFillHeart className="text-red-600 text-2xl" />}</>
            ) : (
              <>{<AiOutlineHeart className="text-[#282c34] text-2xl" />}</>
            )}
          </Link>
        </>
      )}
      <img
        src={imgSrc}
        alt={imgAlt}
        className="w-[150px] mx-auto mt-2 h-[200px] object-contain"
      />
      <h3 className="text-[14px] font-extrabold px-5">
        <b>{bookName}</b>
      </h3>
      <span className="my-4 inline-block">
        <i>by {author}</i>
      </span>
      <div className="flex justify-between items-center">
        <p>
          <b>R.S {discountedPrice}</b>
        </p>
        <del>R.S {originalPrice}</del>
        <span className="text-red-500 text-[12px]">({discountPercent}%)</span>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <div className="rating flex items-center gap-2 justify-center">
          <h3>Rating:</h3>
          <div className="flex items-center ">
            {Array.from({ length: rating }, (_, index) => {
              return (
                <Fragment key={index}>
                  <span className="text-yellow-400">
                    <AiTwotoneStar />
                  </span>
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="genre">
          <span className="text-[16px]">
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Card;

Card.propTypes = {
  bookName: PropTypes.string,
  originalPrice: PropTypes.number,
  author: PropTypes.string,
  discountedPrice: PropTypes.number,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  badgeText: PropTypes.string,
  discountPercent: PropTypes.number,
  _id: PropTypes.string,
  genre: PropTypes.string,
  isLiked: PropTypes.any,
  handleLikeBtnClick: PropTypes.func,
  rating: PropTypes.number,
  isLogged: PropTypes.string,
};
