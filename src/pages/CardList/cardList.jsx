import PropTypes from "prop-types";
// import { instance } from "@/utils/use-request";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import BasketCard from "@/components/basketCard";
import icon_basket from "../../Assets/Icons/icon_basket.svg";

import "./cardList.scss";
import { Link } from "react-router-dom";

function MainCard({ handleLikeBtnClick, addCardBtn, cardList, setCardList }) {
  // const [dataCard, setDataCard] = useState([]);
  const [allDiscount, setAllDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  // const getData = async () => {
  //   const data = await instance.get("/user");
  //   setDataCard(data.data?.user?.cart);
  // };

  // const click = async (id) => {
  //   await instance.delete("/cart/" + id);
  //   getData();
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    const num = cardList?.reduce((acc, el) => {
      acc += el.quantity * (el.originalPrice - el.discountedPrice);
      return acc;
    }, 0);
    setAllDiscount(num);
  }, [cardList]);

  useEffect(() => {
    const num = cardList?.reduce(
      (acc, el) => acc + el.quantity * el.discountedPrice,
      0
    );
    setTotal(num);
  }, [cardList]);

  const changeCardValue = (value, id) => {
    const newCart = cardList?.map((el) => {
      if (el._id == id) {
        el.quantity = value;
      }
      return el;
    });

    setCardList([...newCart]);
  };

  return (
    <div className="px-10">
      {cardList?.length ? (
        <>
          <h1 className="text-center mt-16 my-7 text-3xl text-black">
            {cardList?.length} items in Cards
          </h1>
          <div className="container flex-wrap relative mb-5 text-black flex justify-around">
            <div className="">
              {cardList.map((card) => (
                <BasketCard
                  key={card._id}
                  {...card}
                  click={addCardBtn}
                  changeCardValue={changeCardValue}
                  handleLikeBtnClick={handleLikeBtnClick}
                />
              ))}
            </div>
            <div className="w-[500px] max-h-[500px] border-2 px-8 flex flex-col gap-5 pt-10 pb-6 items-center">
              <h1 className="text-2xl">
                <b>Bill Details</b>
              </h1>
              <div className="border-[1px] w-[100%] border-slate-600"></div>
              {cardList?.map((card) => {
                return (
                  <Fragment key={card._id}>
                    <div className="flex justify-between items-center w-[100%]">
                      <div className="">
                        <h1 className="w-[280px] text-center">
                          {card.bookName}
                        </h1>
                      </div>
                      <div className="">X {card.quantity}</div>
                      <div className="">
                        <p>₹ {card.discountedPrice * card.quantity}</p>
                      </div>
                    </div>
                  </Fragment>
                );
              })}

              <div className="border-[1px] w-[100%] border-slate-600"></div>

              <div className="flex justify-between items-center w-[100%]">
                <h1 className="w-[280px] text-center">Discount</h1>
                <p>₹ {allDiscount}</p>
              </div>
              <div className="flex justify-between items-center w-[100%]">
                <h1 className="w-[280px] text-center">Delivery Charges</h1>
                <p>₹ 50</p>
              </div>
              <div className="border-[1px] w-[100%] border-slate-600"></div>
              <div className="flex justify-between items-center w-[100%]">
                <h1 className="w-[280px] text-center">
                  <b>Total Charges</b>
                </h1>
                <p>
                  <b>₹ {total}</b>
                </p>
              </div>
              <div className="border-[1px] w-[100%] border-slate-600"></div>
              <Link
                to="/order"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 w-[100%] h-10 px-8 py-2 bg-[#00d09c] hover:bg-[#00be8f]"
              >
                Pleasem Order
              </Link>
            </div>
          </div>
        </>
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
  allDiscount: PropTypes.number,
  changeCardValue: PropTypes.func,
  cardList: PropTypes.array,
  setCardList: PropTypes.func,
  addCardBtn: PropTypes.func,
};
