import PropTypes from "prop-types";
import { instance } from "@/utils/use-request";
import { useEffect, useState } from "react";
import Card from "./card";

function NewArrivals({ wishList, setWishList }) {
  const [arrivals, setArrivals] = useState();
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/newarrivals");
      setArrivals(data.data?.newArrivalList);
    })();
  }, []);

  const handleLikeBtnClick = (id) => {
    const el = wishList.find((wishItem) => wishItem._id === id);

    if (!el) {
      setWishList((prev) => [...prev, arrivals.find((arr) => arr._id === id)]);
    } else {
      setWishList((prev) => prev.filter((wishItem) => wishItem._id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center mb-10">
      <div className="box_title text-center text-5xl mb-3">
        <h1>New Arrivals</h1>
      </div>
      <div className="flex justify-between flex-wrap gap-5">
        {arrivals?.map((arrival) => (
          <Card
            key={arrival._id}
            {...arrival}
            isLiked={
              wishList.findIndex(
                (wishItem) => wishItem._id === arrival?._id
              ) === -1
            }
            handleLikeBtnClick={handleLikeBtnClick}
          />
        ))}
      </div>
    </div>
  );
}
export default NewArrivals;

NewArrivals.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
};
