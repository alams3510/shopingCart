import { CartState } from "../../context/Context";
import Rating from "../Rating";
import "./cart.css";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.qty), 0)
    );
  }, [cart]);

  console.log(cart);
  return (
    <div className="cartContainer">
      <div className="listGroup">
        <ul className="listItemCart">
          {cart.map((prod) => {
            return (
              <li className="lists">
                <img src={prod.image} alt="img" className="cartSideImg" />
                <h4>{prod.name}</h4>
                <p>{prod.price}</p>
                <p>{prod.fastDelivery}</p>
                <form>
                  <select
                    className="cartSelct"
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      });
                    }}
                    value={prod.qty}
                  >
                    {[...Array(prod.inStock).keys()].map((x) => {
                      return <option value={x + 1}>{x + 1}</option>;
                    })}
                  </select>
                </form>
                <div className="cartsinglebody">
                  <Rating
                    className="rating"
                    rating={prod.ratings}
                    style={{ color: "red" }}
                  />
                </div>
                <div
                  className="del"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    });
                  }}
                >
                  <AiFillDelete />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rightbarCart">
        <div className="rightCartBody">
          <span className="heading">
            Subtotal <b>({cart.length})</b> items
          </span>
          <span className="total">Total: {total}</span>
          <Link to="/">
            <button className="checkout" disabled={cart.length === 0}>
              Proceed to CheckOut
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
