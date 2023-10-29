import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home.jsx";

import Header from "./components/header.jsx";
import Layout from "./components/layout.jsx";
import SingleProduct from "./pages/single-product.jsx";
import Shop from "./pages/shop.jsx";
import WishList from "./pages/wishlist.jsx";
import { instance } from "./utils/use-request.js";
import Login from "./pages/login.jsx";
import CardList from "./pages/CardList/CardList.jsx";
import Order from "./pages/Order/order.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isLogged, setIsLogged] = useState(() =>
    localStorage.getItem("access_token")
  );
  const [arrivals, setArrivals] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/newarrivals");
      setArrivals(data.data?.newArrivalList);
    })();
  }, []);

  const getData = async () => {
    const data = await instance.get("/user");
    if (data.data?.user) {
      setWishList(data.data?.user?.wishlist);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    (async () => {
      const data = await instance.get("/home/products");
      setProducts(data.data?.productsList);
    })();
    getData();
  }, []);

  const handleLikeBtnClick = async (id) => {
    const el = wishList.find((wishItem) => wishItem._id === id);

    if (!el) {
      const product =
        products.find((arr) => arr._id === id) ||
        arrivals.find((arr) => arr._id === id);
      setWishList((prev) => [...prev, product]);
      await instance.patch("/wishlist", {
        productdetails: product,
      });
    } else {
      setWishList((prev) => prev.filter((wishItem) => wishItem._id !== id));
      await instance.delete("/wishlist/" + id);
    }
  };

  const addCardBtn = async (id) => {
    const el = cardList.find((card) => card._id === id);

    if (!el) {
      const product =
        products.find((arr) => arr._id === id) ||
        arrivals.find((arr) => arr._id === id);
      setCardList((prev) => [...prev, product]);
      await instance.patch("/cart", {
        productdetails: product,
      });
    } else {
      setCardList((prev) => prev.filter((cards) => cards._id !== id));
      await instance.delete("/cart/" + id);
    }
  };

  return (
    <BrowserRouter>
      <Layout>
        <Header
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          wishList={wishList}
          cardList={cardList}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                arrivals={arrivals}
                handleLikeBtnClick={handleLikeBtnClick}
                isLogged={isLogged}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                handleLikeBtnClick={handleLikeBtnClick}
                products={products}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                wishList={wishList}
                setWishList={setWishList}
                isLogged={isLogged}
              />
            }
          />
          <Route
            path="/product/:productID"
            element={
              <SingleProduct
                handleLikeBtnClick={handleLikeBtnClick}
                products={products}
                wishList={wishList}
                addCardBtn={addCardBtn}
                cardList={cardList}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              isLogged ? (
                <WishList
                  wishList={wishList}
                  handleLikeBtnClick={handleLikeBtnClick}
                  isLogged={isLogged}
                />
              ) : (
                <Login setIsLogged={setIsLogged} />
              )
            }
          />
          <Route
            path="/cards"
            element={
              isLogged ? (
                <CardList
                  addCardBtn={addCardBtn}
                  handleLikeBtnClick={handleLikeBtnClick}
                  cardList={cardList}
                  setCardList={setCardList}
                />
              ) : (
                <Login setIsLogged={setIsLogged} />
              )
            }
          />

          <Route
            path="/order"
            element={isLogged ? <Order /> : <Login setIsLogged={setIsLogged} />}
          />

          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route patch="*" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
