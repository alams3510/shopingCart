import "./singleproduct.css";
import Rating from "../Rating";
import { CartState } from "../../context/Context";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="singleprodContainer">
      <div className="singleWrapper">
        <img src={prod.image} alt="img" className="topImg" />
        <div className="singlebody">
          <h3>{prod.name}</h3>
          <p>{prod.price}</p>
          <p>{prod.fastDelivery ? "Fast Delivery" : "7 days Delivery"}</p>

          <Rating
            className="rating"
            rating={prod.ratings}
            style={{ color: "red" }}
          />
          <br />

          {cart.some((p) => p.id === prod.id) ? (
            <button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}
              className="cartBtns"
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                });
              }}
              className="cartBtn"
              disabled={!prod.inStock}
            >
              {!prod.inStock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
