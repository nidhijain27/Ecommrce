import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
const NavBar = () => {
  const router = useRouter();
  const cookieuser = parseCookies();
  let user = cookieuser.user ? JSON.parse(cookieuser.user) : "";

  function isActive(route) {
    if (route == router.pathname) {
      return "active";
    } else "";
  }

  return (
    <nav
      style={{
        padding: "0px 20px",
        background: "#1565c0",
        position: "sticky",
        top: "0px",
        zIndex: "100",
      }}
    >
      <div className="nav-wrapper #1565c0 blue darken-3 ">
        <Link href="/" className="brand-logo left">
          Home
        </Link>

        <ul id="nav-mobile" className="right">
          <li className={isActive("/cart")}>
            <Link href="/cart">cart</Link>
          </li>

          {user.role == "ADMIN" || user.role == "ROOT" ? (
            <li className={isActive("/create")}>
              <Link href="/create">create</Link>
            </li>
          ) : (
            <></>
          )}

          {user ? (
            <>
              <li className={isActive("/account")}>
                <Link href="/account">Account</Link>
              </li>
              <li>
                <button
                  className="btn red"
                  onClick={() => {
                    cookie.remove("token");
                    cookie.remove("user");
                    router.push("/login");
                  }}
                >
                  logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={isActive("/login")}>
                <Link href="/login">login</Link>
              </li>
              <li className={isActive("/signup")}>
                <Link href="/signup">signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
