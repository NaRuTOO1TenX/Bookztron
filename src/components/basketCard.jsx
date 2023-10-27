import PropTypes from "prop-types";
import { badgeVariants } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState } from "react";

function BasketCard({
  bookName,
  originalPrice,
  author,
  discountedPrice,
  imgSrc,
  imgAlt,
  badgeText,
  discountPercent,
  genre,
  // quantity,
  click,
  _id,
  handleLikeBtnClick,
  // setDataCard,
}) {
  const inputRef = useRef();
  const [productQuantity, setProductQuantity] = useState(0);

  return (
    <div className="w-[600px] text-black my-3 border border-gray-300 cursor-pointer p-6 relative flex">
      <div>
        <span
          className={`${badgeVariants({
            variant: "destructive",
          })} absolute top-0 left-0 rounded-none w-[100px] h-[30px]`}
        >
          {badgeText}
        </span>

        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-[180px] mx-auto mt-5 h-[250px] object-contain shadow-lg text-black"
        />
      </div>
      <div className="ml-3">
        <h3 className="text-xl font-semibold text-black">{bookName}</h3>
        <div className="my-4 text-lg text-black">- By {author}</div>
        <div className="flex gap-5 items-center font-semibold text-black">
          <p>R.S {discountedPrice}</p>
          <del>R.S {originalPrice}</del>
          <span className="text-red-500 text-[12px]">({discountPercent}%)</span>
        </div>
        <h4 className="text-green-500">Genre: {genre}</h4>
        <div className="text-2xl flex items-center gap-2 text-black">
          Quantity:
          <Button
            variant="outline"
            className="rounded-full text-black font-extrabold"
            onClick={() => {
              --inputRef.current.value;
              setProductQuantity((prev) => prev - 1);
            }}
          >
            -
          </Button>
          <Input
            type="number"
            ref={inputRef}
            min={0}
            defaultValue={1}
            onChange={() => {
              console.log(productQuantity);
            }}
            className="text-black"
          />
          <Button
            variant="outline"
            className="rounded-full text-black font-extrabold"
            onClick={() => {
              ++inputRef.current.value;
              setProductQuantity((prev) => prev + 1);
            }}
          >
            +
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Button
            className="bg-red-500 hover:bg-red-800"
            onClick={() => {
              click(_id);
            }}
          >
            Remove Card
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-800"
            onClick={() => {
              handleLikeBtnClick(_id);
            }}
          >
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}
export default BasketCard;

BasketCard.propTypes = {
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
  click: PropTypes.func,
  handleLikeBtnClick: PropTypes.func,
  quantity: PropTypes.number,
  setDataCard: PropTypes.func,
};
