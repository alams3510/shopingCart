// import { useState } from "react";
import { CartState } from "../../context/Context";
import Rating from "../Rating";
import "./filter.css";

const Filter = () => {
  // const [rate, setRate] = useState(2);

  const {
    productState: { byStock, byfastDelivery, sort, byRating, searchQuery },
    productDispatch,
  } = CartState();

  console.log(byStock, byfastDelivery, byRating, sort, searchQuery);

  return (
    <div className="filterContainer">
      <div className="filterWrapper">
        <h2>Filter Products</h2>
        <ul className="list">
          <li className="listItem">
            <input
              name="radio"
              id="inc"
              type="radio"
              className="radio"
              onChange={() => {
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                });
              }}
              checked={sort === "lowToHigh" ? true : false}
            />
            <label htmlFor="inc">Asscending</label>
          </li>
          <li className="listItem">
            <input
              name="radio"
              id="dec"
              type="radio"
              className="radio"
              onChange={() => {
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highTOLow",
                });
              }}
              checked={sort === "highTOLow" ? true : false}
            />
            <label htmlFor="dec">Descending</label>
          </li>
          <li className="listItem">
            <input
              type="checkbox"
              id="stock"
              className="radio"
              onChange={() => {
                productDispatch({
                  type: "FILTER_BY_STOCK",
                });
              }}
              checked={byStock}
            />
            <label htmlFor="stock">Include out of Stock</label>
          </li>
          <li className="listItem">
            <input
              type="checkbox"
              id="delivery"
              className="radio"
              onChange={() => {
                productDispatch({
                  type: "FILTER_BY_DELIVERY",
                });
              }}
              checked={byfastDelivery}
            />
            <label htmlFor="delivery">Fast Delivery Only</label>
          </li>
          <li className="listItem">
            <span>
              <label style={{ paddingRight: 10 }}>rating</label>
              <Rating
                rating={byRating}
                onClick={(i) =>
                  productDispatch({
                    type: "FILTER_BY_RATING",
                    payload: i + 1,
                  })
                }
              />
            </span>
          </li>
          <li className="listItem">
            <button
              onClick={() => {
                productDispatch({
                  type: "CLEAR_FILTER",
                });
              }}
            >
              Clear Filter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
