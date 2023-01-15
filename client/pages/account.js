import { parseCookies } from "nookies";
import baseUrl from "../helpers/baseUrl";
import { useEffect, useRef, useState } from "react";
import UserRoles from "../components/UserRoles";
import Moment from "react-moment";

const Account = ({ orders }) => {
  const orderCard = useRef(null);
  const cookie = parseCookies();
  const [user, setUser] = useState(cookie.user ? JSON.parse(cookie.user) : "");
  // const user = cookie.user ? JSON.parse(cookie.user) : "";
  useEffect(() => {
    M.Collapsible.init(orderCard.current);
  }, []);

  const OrderHistory = () => {
    return (
      <ul className="collapsible" ref={orderCard}>
        {orders.map((item, index) => {
          return (
            <li key={index}>
              <div className="collapsible-header">
                <i className="material-icons">folder</i>
                <Moment>{item.created_at}</Moment>
              </div>
              <div className="collapsible-body">
                <h5>Total ₹ {item.total_price}</h5>
                <ol
                  type="disc"
                  style={{
                    display: "flex",

                    flexWrap: "wrap",
                  }}
                >
                  {item.items.map((pitem, index) => {
                    return (
                      <>
                        <li key={index} style={{ width: "170px" }}>
                          <div className="heading">{pitem?.productName}</div>
                          <h6>Quantity = {pitem?.quantity} </h6>
                          <h6>Price = {pitem?.price}</h6>
                        </li>
                      </>
                    );
                  })}
                </ol>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="container">
      <div
        className="center-align"
        style={{
          marginTop: "10px",
          border: "1px solid rgb(242, 242, 242)",
          padding: "3px",
          color: "rgb(153, 153, 153)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: "5px",
        }}
      >
        <div className="avtar__wrapper">
          <img src="assets/img/avtar.png" style={{ width: "40px" }} />
        </div>
        <div className="heading">{user.name}</div>
        <h6>{user.email}</h6>
      </div>
      <h5 style={{ margin: "20px 0px" }}>Order History</h5>
      {orders?.length == 0 ? (
        <div className="container">
          <h5>Your have no order History</h5>
        </div>
      ) : (
        <OrderHistory />
      )}
      {user.role == "ROOT" && <UserRoles />}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { user } = parseCookies(ctx);
  if (!user) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" }); // redirect under serverSideProps
    res.end();
  }

  const res = await fetch(`${baseUrl}/sucess-orders/findAllOrders`, {
    headers: {
      user: user,
    },
  });
  const res2 = await res.json();

  return {
    props: { orders: res2 },
  };
}

export default Account;
