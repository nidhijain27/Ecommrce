import { parseCookies } from "nookies";
import baseUrl from "../helpers/baseUrl";
import { useEffect, useRef } from "react";
import UserRoles from "../components/UserRoles";
import Moment from "react-moment";

const Account = ({ orders }) => {
  const orderCard = useRef(null);
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";

  useEffect(() => {
    M.Collapsible.init(orderCard.current);
  }, []);
  const OrderHistory = () => {
    return (
      <ul className="collapsible" ref={orderCard}>
        {orders.map((item) => {
          return (
            <li key={item.id}>
              <div className="collapsible-header">
                <i className="material-icons">folder</i>
                <Moment>{item.created_at}</Moment>
              </div>
              <div className="collapsible-body">
                <h5>Total ₹ {item.total_price}</h5>
                <ol type="disc">
                  {item.items.map((pitem) => {
                    return (
                      <>
                        <li key={pitem.id}>
                          <h5>{pitem?.productName}</h5>
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
        className="center-align white-text"
        style={{
          marginTop: "10px",
          backgroundColor: "#1565c0",
          padding: "3px",
        }}
      >
        <h4>{user.name}</h4>
        <h4>{user.email}</h4>
      </div>
      <h3>Order History</h3>
      {orders.length == 0 ? (
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
