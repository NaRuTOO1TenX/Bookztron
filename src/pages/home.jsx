import PropTypes from "prop-types";
import Genres from "@/components/genres";
import NewArrivals from "@/components/new-arrivals";

import Library_Illustration_1 from "../Assets/Images/Library_Illustration_1.jpg";

function Home({ selectedGenres, setSelectedGenres, wishList, setWishList }) {
  return (
    <div className="mt-3">
      <div className="main_img  max-w-[100%] mb-12">
        <img src={Library_Illustration_1} alt="Main img" loading="lazy" />
      </div>
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <NewArrivals setWishList={setWishList} wishList={wishList} />
    </div>
  );
}
export default Home;

Home.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  wishList: PropTypes.array,
  setWishList: PropTypes.func,
};
