import PropTypes from "prop-types";
import { instance } from "@/utils/use-request";
import { useState } from "react";
import { useEffect } from "react";
import BasketCard from "@/components/basketCard";
import icon_basket from "../../Assets/Icons/icon_basket.svg";

import "./cardList.scss";
import { Link } from "react-router-dom";

function MainCard({ handleLikeBtnClick }) {
  const [dataCard, setDataCard] = useState([]);

  const getData = async () => {
    const data = await instance.get("/user");
    setDataCard(data.data?.user?.cart);
  };

  const click = async (id) => {
    await instance.delete("/cart/" + id);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {dataCard?.length ? (
        <div className="container mt-24 mb-5 text-black">
          <h1 className="text-center my-7 text-3xl text-black">
            {dataCard?.length} items in Cards
          </h1>
          {dataCard.map((card) => (
            <BasketCard
              key={card._id}
              {...card}
              click={click}
              handleLikeBtnClick={handleLikeBtnClick}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 mw-[100%] flex flex-col justify-center items-center">
          <h1 className="text-2xl">
            <b>0 items in Cart</b>
          </h1>
          <div className="max-w-[15%]">
            <img src={icon_basket} alt="heart" />
          </div>
          <h1 className="text-2xl">
            <b>Your cart is empty 🙃</b>
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-[#BD5D78] mt-4"
          >
            Go to shop
          </Link>
        </div>
      )}
    </div>
  );
}

export default MainCard;

MainCard.propTypes = {
  handleLikeBtnClick: PropTypes.func,
};
