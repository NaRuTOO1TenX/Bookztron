import { genres } from "@/constants/genre";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Genres({ setSelectedGenres }) {
  const navigate = useNavigate();
  const handleClick = (item) => {
    setSelectedGenres(item);
    navigate("/shop");
  };
  return (
    <div className="flex flex-col gap-5 items-center mb-10">
      <div className="box_title text-center text-5xl mb-3">
        <h1>Genres</h1>
      </div>
      <div className="flex justify-around gap-5 flex-wrap mb-3">
        {genres.map((genre) => (
          <div
            onClick={() => handleClick([genre])}
            key={genre.title}
            className="bg-blue-200 w-[100px] h-[100px] flex justify-center items-center text-lg cursor-pointer"
          >
            {genre.title}
          </div>
        ))}
      </div>
      <div>
        <button className="btn_red bg-red-600 px-5 py-2 text-white rounded">
          Explore All
        </button>
      </div>
    </div>
  );
}
export default Genres;

Genres.propTypes = {
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
};
