import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import { toast } from "react-toastify";

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const { error, userInfo } = useSelector((state) => state.userLogin);

  const redirect = location.state?.path || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }

    if (error) toast.error(error);
  }, [navigate, userInfo, redirect, error]);

  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center px-5 py-5 bg-gray-100">
        <h3 className="text-black font-medium text-3xl mb-3">
          Welcome To ALP!
        </h3>

        <div className="w-full max-w-md bg-white p-3 md:p-9 shadow-md rounded-xl">
          <form onSubmit={submitHandler} className="space-y-6">
            <Input
              label="Email"
              placeholder="johndoe@gmail.com"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              placeholder="*********"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button text="Sign In" />
          </form>

          <p className="mt-3 text-center text-gray-500 text-base font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
