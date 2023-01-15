import baseUrl from "../helpers/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const Cart = ({ error, products }) => {
  const { user } = parseCookies();
  const router = useRouter();
  const [cProducts, setCartProduct] = useState(products.result);

  useEffect(() => {}, [cProducts]);

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
      <>
        {console.log("Products", cProducts)}
        {cProducts.map((item) => {
          price = price + item.quantity * item.price;

          return (
            <div style={{ display: "flex", margin: "20px" }} key={item.id}>
              <img src={item.mediaUrl} style={{ width: "30%" }} />
              <div style={{ marginLeft: "20px" }}>
                <h6>{item.name}</h6>
                <h6>
                  {item.quantity} x ₹ {item.price}
                </h6>
                <button
                  className="btn red"
                  onClick={() => {
                    handleRemove(item.productId);
                  }}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
      </>
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
      router.push("/");
    }
  };

  const TotalPrice = () => {
    return (
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h5>total ₹ {price}</h5>
        {products.result.length != 0 && (
          <StripeCheckout
            name="My store"
            amount={price * 100}
            image={
              products.result.length > 0 ? products.result[0].mediaUrl : ""
            }
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
    <div className="container">
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
