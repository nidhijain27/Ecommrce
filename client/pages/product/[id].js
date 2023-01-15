import { useRouter } from "next/router";
import baseUrl from "../../helpers/baseUrl";
import { useRef, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import cookie2 from "js-cookie";

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const modalRef = useRef(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const cookie = parseCookies();
    const user = cookie.user ? cookie.user : "";
    setUser(user);
    M.Modal.init(modalRef.current);
  }, []);
  if (router.isFallback) {
    return <h3>loading...</h3>;
  }

  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete this?</p>
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light #1565c0 blue darken-3">
            cancel
          </button>
          <button
            className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(
      `${baseUrl}/products/deleteProductById/${product.id}`,
      {
        method: "POST",
      }
    );
    const data = await res.json();
    console.log(data, "data");
    if (data.statusCode == 200) {
      M.toast({ html: data.result, classes: "green" });
      setTimeout(() => {
        router.push("/");
      }, "1000");
    } else {
      console.log(data.message);
    }
  };

  const AddToCart = async () => {
    if (quantity > 0) {
      const res = await fetch(`${baseUrl}/cart/updateCart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          user: user,
        },
        body: JSON.stringify({
          quantity,
          productId: product.id,
          productName: product.name,
        }),
      });
      const res2 = await res.json();
      console.log(res2);

      if (res2.statusCode != 200) {
        M.toast({ html: res2.message, classes: "red" });
        cookie2.remove("user");
        cookie2.remove("token");
        router.push("/login");
      }
      M.toast({ html: res2.result, classes: "green" });
    } else {
      M.toast({ html: "Min quantity in One", classes: "red" });
    }
  };

  return (
    <div className="container center-align">
      <h3>{product?.name}</h3>
      <img src={product?.mediaUrl} style={{ width: "30%" }} />
      <h5>RS {product?.price}</h5>
      <input
        type="number"
        style={{ width: "400px", margin: "10px" }}
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Qunatity"
      />
      {user ? (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => AddToCart()}
        >
          Add
          {/* <i className="material-icons right">add</i> */}
        </button>
      ) : (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => router.push("/login")}
        >
          Login To Add
          <i className="material-icons right">add</i>
        </button>
      )}

      <p className="left-align">{product?.description}</p>

      {/* {user.role != "CONSUMER" && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      )} */}

      {getModal()}
    </div>
  );
};

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/products/getProductById/${id}`);
  const data = await res.json();
  if (data.errorCode == 0) {
    return {
      props: {
        product: data.data,
      },
    };
  } else {
    return {
      props: {
        product: data,
      },
    };
  }
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  };
}

export default Product;
