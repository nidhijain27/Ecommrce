import Link from "next/link";
import { useState } from "react";
import baseUrl from "../helpers/baseUrl";
import cookie from "js-cookie";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const userLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${baseUrl}/user/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res2 = await res.json();
    if (res2.statusCode != 200) {
      M.toast({ html: res2.message, classes: "red" });
    } else {
      M.toast({ html: res2.message, classes: "green" });

      cookie.set("token", res2.result.token);

      console.log(res2.result, "nj");
      cookie.set("user", JSON.stringify(res2.result.user));
      router.push("/");
    }
  };
  return (
    <div className="container card authcard center-align">
      <h3>LOGIN</h3>
      <form onSubmit={(e) => userLogin(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          type="submit"
        >
          login
          <i className="material-icons right">forward</i>
        </button>
        <Link href="/signup">
          <h5>Dont have a account ?</h5>
        </Link>
      </form>
    </div>
  );
};

export default Login;
