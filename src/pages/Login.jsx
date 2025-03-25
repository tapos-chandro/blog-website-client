import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="hero ">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-full shadow-2xl">
            <div className="card-body w-sm">
                <h1 className="text-2xl font-bold text-center text-primary-text-color">Login</h1>
              <form className="fieldset">
                <label className="fieldset-label">Email</label>
                <input type="email" className="input rounded-full focus:outline-hidden w-full" placeholder="Email" />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  className="input rounded-full focus:outline-hidden w-full"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover text-primary-text-color">Forgot password?</a>
                </div>
                <button className="btn rounded-full bg-primary-color text-white mt-4">Login</button>
              </form>
              <div className="divider">OR</div>
              <div className="flex justify-center gap-4 ">
              <FcGoogle  className="text-3xl cursor-pointer"/>
              </div>
              <p className="text-center text-primary-text-color">Need an account? <Link to="/register" className="text-primary-color underline">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
