import "./header.css";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartState } from "../../context/Context";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
  return (
    <div className="container">
      <div className="navWrapper">
        <Link to="/" className="links">
          <span className="brandName">Shopping Cart</span>
        </Link>
        <input
          type="text"
          className="searchInput"
          placeholder="Search your Item"
          onChange={(e) => {
            productDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value,
            });
          }}
        />
        <div className="dropdownContainer">
          <div
            className="dropdown"
            onClick={() => {
              setShow(!show);
            }}
          >
            <BsFillCartFill color="white" size={30} />
            <span>{cart.length}</span>
          </div>

          {show && (
            <ul className="select ">
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => {
                    return (
                      <>
                        <li className="cartItem">
                          <div className="cartLeft">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="cartImg"
                            />
                            <div className="cartItemDetails">
                              <span className="prodName">{prod.name}</span>
                              <span className="prodPrice">
                                {prod.price.split(".")[0]}
                              </span>
                            </div>
                          </div>
                          <div
                            className="cartRight"
                            onClick={() => {
                              dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod,
                              });
                            }}
                          >
                            <AiFillDelete fontSize="20" />
                          </div>
                        </li>
                      </>
                    );
                  })}
                </>
              ) : (
                <div>
                  <span>cart is empty!</span>
                </div>
              )}

              <Link
                to="/cart"
                className="gotocart"
                onClick={() => {
                  setShow(!show);
                }}
              >
                Go to Cart
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
