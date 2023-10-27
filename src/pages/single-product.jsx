import PropTypes from "prop-types";

import { instance } from "@/utils/use-request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../components/style/singleProduct.scss";

function SingleProduct({ handleLikeBtnClick, products, addCardBtn, wishList }) {
  const [product, setProduct] = useState(null);
  const { productID } = useParams();

  useEffect(() => {
    (async () => {
      const data = await instance.get("/home/newarrivals");
      let card = await data.data?.newArrivalList?.filter(
        (el) => el._id === productID
      );
      if (card.length === 0) {
        card = await products?.filter((el) => el._id === productID);
      }
      setProduct(card);
    })();
  }, [productID]);

  return (
    <div className="handle_single_product">
      {product ? (
        <div className="product-page-container">
          <div className="product-page-item">
            <img
              className="bookcover-image"
              src={product[0].imgSrc}
              alt={product[0].imgAlt}
            ></img>
            <div className="item-details">
              <h2 className="text-2xl border-b-2 pb-4 mb-4 gap-0">
                <b>{product[0].bookName}</b>
              </h2>
              <p className="mb-5">
                <b>Author : </b> &nbsp;&nbsp; <span>{product[0].author}</span>{" "}
              </p>
              <p className="item-description mb-5">
                <b>Description : </b> &nbsp;&nbsp;{" "}
                <span>{product[0].description}</span>{" "}
              </p>
              <p className="item-rating mb-5">
                <b>Rating : </b> &nbsp;&nbsp; <span>{product[0].rating}</span>{" "}
              </p>
              <h3 className="item-price-details mb-5">
                <b>Rs. {product[0].discountedPrice} &nbsp;&nbsp;</b>
                <del>Rs. {product[0].originalPrice}</del> &nbsp;&nbsp;
                <span className="discount-on-item text-red-600">
                  <b> ({product[0].discountPercent}% off)</b>
                </span>
              </h3>
              <div className="item-buttons max-w-[100%] flex">
                <button
                  onClick={() => {
                    handleLikeBtnClick(product[0]._id);
                  }}
                  className="solid-primary-btn"
                >
                  {wishList.findIndex(
                    (wishItem) => wishItem._id === product[0]?._id
                  ) === -1
                    ? "Add to wishlist"
                    : "Remove from wishlist"}
                </button>
                <button
                  className="solid-warning-btn"
                  onClick={() => addCardBtn(product[0]._id)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

SingleProduct.propTypes = {
  handleLikeBtnClick: PropTypes.func,
  products: PropTypes.array,
  addCardBtn: PropTypes.func,
  wishList: PropTypes.array,
};

export default SingleProduct;
