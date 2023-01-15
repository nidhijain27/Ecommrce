import baseUrl from "../helpers/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const Cart = ({ error, products }) => {
  const router = useRouter();
  const [cProducts, setCartProduct] = useState(products.result);
  const [user, setUser] = useState("");
  useEffect(() => {
    const { user } = parseCookies();
    setUser(user);
  }, []);

  let price = 0;
  if (!user) {
    return (
      <div className="center-align">
        <h3>Please login to view your cart</h3>
        <Link href="/login">
          <button className="btn #1565c0 blue darken-3">Login</button>
        </Link>
      </div>
    );
  }
  if (error) {
    M.toast({ html: error, classes: "red" });
    cookie.remove("user");
    cookie.remove("token");
    router.push("/login");
  }
  const handleRemove = async (productId) => {
    const res = await fetch(`${baseUrl}/cart/deleteProductFromCart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        user: user,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });

    const res2 = await res.json();
    setCartProduct(res2.result);
  };

  const CartItems = () => {
    return (
      <div className={`cart__container ${cProducts.length && "border"}`}>
        <div className="heading">My Cart</div>
        {cProducts.length > 0 ? (
          cProducts?.map((item, index) => {
            price = price + item.quantity * item.price;

            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "10px 0px",
                }}
                key={index}
              >
                <img
                  src={item.mediaUrl}
                  style={{ width: "100px", borderRadius: "4px" }}
                  className="product__image"
                />
                <div
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="heading"
                    style={{ lineHeight: "5px", color: "" }}
                  >
                    {item?.name}
                  </div>
                  <h6 style={{ lineHeight: "5px" }}>
                    {item?.quantity} x ₹ {item?.price}
                  </h6>
                  <button
                    className="btn red"
                    style={{
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "30px",
                      marginTop: "5px",
                    }}
                    onClick={() => {
                      handleRemove(item?.productId);
                    }}
                  >
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty__cart__wrapper">
            <img src="assets/img/cart.png" />
            <div className="heading">You don't have any items in your cart</div>
            <div className="para">
              Your favourite items are just a click away
            </div>
            <button
              className="btn blue"
              style={{ borderRadius: "5px" }}
              onClick={() => {
                router.push("/");
              }}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    );
  };

  const handleCheckout = async (paymentInfo) => {
    const res = await fetch(`${baseUrl}/cart/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user: user,
      },
      body: JSON.stringify({
        paymentInfo,
      }),
    });
    const res2 = await res.json();
    if (res2.statusCode == 200) {
      M.toast({ html: res2.result, classes: "green " });
      router.push("/account");
    }
  };

  const TotalPrice = () => {
    return (
      <div
        // className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {cProducts?.length != 0 && <h5>Total ₹ {price}</h5>}
        {cProducts?.length != 0 && (
          <StripeCheckout
            name="My store"
            amount={price * 100}
            image={cProducts?.length > 0 ? cProducts[0]?.mediaUrl : ""}
            currency="INR"
            shippingAddress={true}
            billingAddress={true}
            zipCode={true}
            stripeKey="pk_test_51IjklUSJHFYF8Oae4KKF41Ml2fUCNdgOiiTJUgFjbcS5Fi6D7G5hLw4ntAfXu0As0CFJRsVTGU2noXyf7ZnH1TsQ00nUqHISx2"
            token={(paymentInfo) => handleCheckout(paymentInfo)}
          >
            <button className="btn">Checkout</button>
          </StripeCheckout>
        )}
      </div>
    );
  };

  return (
    <div className="container__wrapper">
      <CartItems />
      <TotalPrice />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { user } = parseCookies(ctx);
  if (!user) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch(`${baseUrl}/cart/getAllProducts`, {
    headers: {
      user: user,
    },
  });
  const products = await res.json();

  if (products.statusCode != 200) {
    return {
      props: { error: "You Must Logged In" },
    };
  }
  return {
    props: { products },
  };
}

export default Cart;
