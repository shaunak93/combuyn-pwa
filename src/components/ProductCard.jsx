import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../store/actions/cartActions";

function ProductCard({ product, campaign }) {
  const dispatch = useDispatch();
  let {
    name,
    description,
    category,
    marketPrice,
    groupPrice,
    image,
    _id: productId,
    vendorId,
  } = product;

  let { id: campaignId, endTime, name: campaignName, deliveryTime } = campaign;
  const quantity = useSelector(getProductQunatityFromCart);
  //const [quantity, setQuantity] = useState(0);
  const incQuantity = ({ cost, attributes }) => {
    dispatch(
      increaseProductQuantity({
        campaignId: campaign.id,
        campaignDetails: {
          id: campaignId,
          endTime,
          name: campaignName,
          deliveryTime,
        },
        product: {
          name: name,
          productId: productId,
          vendorId: vendorId || "",
          quantity: 1,
          price: cost || groupPrice,
        },
        attributes: attributes || [],
      })
    );
  };

  const decQuantity = ({ attributes }) => {
    dispatch(
      decreaseProductQuantity({
        campaignId,
        product: {
          productId: productId,
        },
        attributes: attributes || [],
      })
    );
  };

  function getProductQunatityFromCart({ cart }) {
    let quantity = 0;
    if (cart?.cart) {
      let campaignInCart = cart.cart.find(
        ({ campaignId: id }) => id === campaignId
      );
      if (campaignInCart) {
        let currentProductInCart = (campaignInCart.products || []).filter(
          ({ productId: id }) => id === productId
        );
        if (currentProductInCart && currentProductInCart.length) {
          currentProductInCart.forEach((product) => {
            quantity = quantity + (product?.quantity || 0);
          });
        }
      }
    }
    return quantity;

    //return 0;
  }

  return (
    <div className="product-card">
      <div className="product-details">
        <div className="product-details-text">
          <p className="product-name">{name}</p>
          <p className="product-description">{description || category}</p>
        </div>
        {image && (
          <div
            className="product-details-image"
            style={{
              backgroundImage: `url("${
                image || "https://random.imagecdn.app/300/150"
              }")`,
            }}
          ></div>
        )}
      </div>
      <div className="quantity-details">
        <p className="product-price">
          ₹ {groupPrice} | &nbsp; <span>₹{marketPrice}</span>
        </p>
        <div className="quantity">
          {quantity ? (
            <div className="quantity-counter">
              <div
                className="decrease-quantity"
                onClick={() => {
                  decQuantity({});
                }}
              >
                -
              </div>
              <div className="current-quantity">{quantity}</div>
              <div
                className="increase-quantity"
                onClick={() => {
                  incQuantity({});
                }}
              >
                +
              </div>
            </div>
          ) : (
            <div
              className="add-product-button"
              onClick={() => {
                incQuantity({});
              }}
            >
              ADD
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
