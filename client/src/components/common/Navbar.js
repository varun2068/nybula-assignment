import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import Navlinks from "./Navlinks";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full  shadow">
      <div className="flex flex-col p-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link
            to="/"
            className="text-lg font-bold tracking-wide text-blue-600 transition duration-500 ease-in-out transform  lg:pr-8"
          >
            ALP
          </Link>
        </div>

        <nav className="flex-col flex-grow hidden md:flex md:justify-end md:flex-row">
          <ul className="space-y-2 list-none lg:space-y-0 lg:items-center lg:inline-flex">
            {userInfo ? (
              <>
                <Navlinks to="/" title="Courses" />
              </>
            ) : (
              <>
                <Navlinks to="/signin" title="Sign In" />
                <Navlinks to="/signup" title="Sign Up" />
              </>
            )}

            {/* Only teacher routes */}
            {userInfo && userInfo.isTeacher && (
              <>
                <Navlinks to="/course/create" title="Create Course" />
                <Navlinks to="/course/list" title="My Courses" />
              </>
            )}

            {/* Logout Button */}
            {userInfo && (
              <button
                className="px-4 py-1 text-gray-500 hover:text-blue-500 font-semibold rounded-full hover:bg-white focus:outline-none focus:shadow-outline hover:outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
