import PropTypes from "prop-types";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { genres } from "@/constants/genre";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

import "./shop.scss";

function Shop({
  products,
  selectedGenres,
  setSelectedGenres,
  handleLikeBtnClick,
  wishList,
  isLogged,
}) {
  const [sliderValues, setSliderValues] = useState({
    min: 0,
    max: 0,
  });
  const [range, setRange] = useState([sliderValues?.min, sliderValues?.max]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const handleRangeChange = (value) => {
    setRange(value);
  };

  useEffect(() => {
    if (!selectedGenres.length) {
      setSelectedGenres([...genres]);
    }
  }, []);
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (products.length) {
      setSliderValues(
        products.reduce(
          (acc, curr) =>
            curr.originalPrice > acc.max
              ? { ...acc, max: curr.originalPrice }
              : acc,
          { min: 0, max: 0 }
        )
      );
    }
  }, [products]);

  useEffect(() => {
    let newProducts = products.filter(
      (product) =>
        (product.discountedPrice >= range[0] ||
          product.originalPrice >= range[0]) &&
        (product.discountedPrice <= range[1] ||
          product.originalPrice <= range[1])
    );

    newProducts = newProducts.filter(
      (pr) =>
        selectedGenres.findIndex(
          (gr) => gr.title.toUpperCase() == pr.genre.toUpperCase()
        ) !== -1
    );

    setFilteredProducts([...newProducts]);
    setLatestProducts([...newProducts]);
  }, [range, selectedGenres]);

  useEffect(() => {
    setRange([sliderValues.min, sliderValues.max]);
  }, [sliderValues]);

  const handleGenreChange = (title) => {
    const currentGrIdx = selectedGenres.findIndex((gr) => gr.title == title);
    if (currentGrIdx === -1) {
      setSelectedGenres((prev) => [...prev, { title }]);
    } else {
      selectedGenres.splice(currentGrIdx, 1);
      setSelectedGenres([...selectedGenres]);
    }
  };
  const onClear = () => {
    setSelectedGenres([...genres]);
    setRange([0, sliderValues.max]);
  };

  // =====================================
  const lowToHigh = () => {
    const filterPriceLow = filteredProducts.sort(
      (a, b) => a.discountedPrice - b.discountedPrice
    );
    setFilteredProducts([...filterPriceLow]);
  };

  const highToLow = () => {
    const filterPriceHigh = filteredProducts.sort(
      (a, b) => b.discountedPrice - a.discountedPrice
    );
    setFilteredProducts([...filterPriceHigh]);
  };

  const filterRating = (rating) => {
    const filteredProductForRating = latestProducts.filter(
      (el) => el.rating == rating
    );

    setFilteredProducts([...filteredProductForRating]);
  };

  const rangeMinvalue = (minValue) => {
    let value = [minValue, range[1]];
    setRange([...value]);
  };

  const rangeMaxvalue = (maxValue) => {
    let value = [range[0], maxValue];
    setRange([...value]);
  };

  // =====================================

  return (
    <div className="flex px-[32px] py-10 mt-5 overflow-y-scroll relative">
      <div className="sidebar shop_filter_section w-[35%] pr-5">
        <div className="flex justify-between mb-7">
          <h3>Filter</h3>
          <a onClick={onClear} className="cursor-pointer underline">
            Clear Filter
          </a>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 py-3 mb-5">
          <h1>Price</h1>
          <div className="flex items-center gap-3">
            <label htmlFor="min" className="flex items-center gap-1">
              Min
              <Input
                type="number"
                min={0}
                max={1000}
                onChange={(e) => {
                  rangeMinvalue(e.target.value);
                }}
                value={range[0]}
              />
            </label>
            -
            <label htmlFor="" className="flex items-center gap-1">
              Max
              <Input
                type="number"
                min={0}
                max={1000}
                onChange={(e) => {
                  rangeMaxvalue(e.target.value);
                }}
                value={range[1]}
              />
            </label>
          </div>
        </div>
        <div>
          <Slider
            defaultValue={[sliderValues.min, sliderValues.max]}
            max={sliderValues?.max}
            min={0}
            step={0.5}
            value={range}
            onValueChange={handleRangeChange}
            formatLabel={(value) => `${value} `}
          />
        </div>
        <div className="mt-14 flex flex-col w-[100%]">
          <h1>Categorrl</h1>
          {genres.map((genre) => (
            <div className="flex items-center space-x-2 mt-3" key={genre.title}>
              <Checkbox
                id={genre.title}
                checked={
                  selectedGenres.findIndex((gr) => gr.title == genre.title) !==
                  -1
                }
                onCheckedChange={() => handleGenreChange(genre.title)}
              />
              <Label
                htmlFor={genre.title}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {genre.title}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-7">
          <Label htmlFor="r1" className="underline text-xl">
            Sort By
          </Label>
          <RadioGroup defaultValue="comfortable" className="mt-2">
            <div className="flex items-center space-x-2" onClick={lowToHigh}>
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Price - Low to High</Label>
            </div>
            <div className="flex items-center space-x-2" onClick={highToLow}>
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Price - High to Low</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <label className="flex item-center gap-2">
            <input
              type="radio"
              value="4"
              name="rating"
              onClick={(e) => {
                filterRating(Number(e.target.value));
              }}
            />
            4 stars or above
          </label>
          <label className="flex item-center gap-2">
            <input
              type="radio"
              value="3"
              name="rating"
              onClick={(e) => {
                filterRating(Number(e.target.value));
              }}
            />
            3 stars or above
          </label>
          <label className="flex item-center gap-2">
            <input
              type="radio"
              value="2"
              name="rating"
              onClick={(e) => {
                filterRating(Number(e.target.value));
              }}
            />
            2 stars or above
          </label>
          <label className="flex item-center gap-2">
            <input
              type="radio"
              value="1"
              name="rating"
              onClick={(e) => {
                filterRating(Number(e.target.value));
              }}
            />
            1 stars or above
          </label>
        </div>
      </div>
      <div className="w-[65%] pl-5 flex flex-col justify-center items-center">
        <div className="shop_product_header text-4xl">
          <h1>Showing {filteredProducts.length} products</h1>
        </div>
        <div className="flex justify-around mt-8 gap-5 flex-wrap ">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                {...product}
                handleLikeBtnClick={handleLikeBtnClick}
                isLogged={isLogged}
                isLiked={
                  wishList.findIndex(
                    (wishItem) => wishItem._id === product._id
                  ) === -1
                }
              />
            ))
          ) : (
            <h1>Not found</h1>
          )}
        </div>
      </div>
    </div>
  );
}
export default Shop;

Shop.propTypes = {
  sliderValues: PropTypes.object,
  setSliderValues: PropTypes.func,
  products: PropTypes.array,
  selectedGenres: PropTypes.array,
  setSelectedGenres: PropTypes.func,
  handleLikeBtnClick: PropTypes.func,
  wishList: PropTypes.array,
  isLogged: PropTypes.string,
};
