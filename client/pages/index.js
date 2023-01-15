import Link from "next/link";
import baseUrl from "../helpers/baseUrl";

const Home = ({ products }) => {
  const productList = products.map((product) => {
    return (
      <div className="card pcard" key={product.id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p> ₹ {product.price}</p>
        </div>
        <div className="card-action">
          <Link href={"/product/[id]"} as={`/product/${product.id}`}>
            View Product
          </Link>
        </div>
      </div>
    );
  });
  return <div className="rootcard">{productList}</div>;
};

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/products/getAllProducts`);
  const data = await res.json();
  if (data.errorCode == 0) {
    return {
      props: {
        products: data.data,
      },
    };
  } else {
    return {
      props: {
        products: data.data,
      },
    };
  }
}

export default Home;
