import { NavLink } from "react-router-dom";

const Navlinks = ({ to, title }) => {
  return (
    <li>
      <NavLink
        to={to}
        className=" px-2
                  lg:px-6
                  pb-5                
                  text-base
                  font-medium
                  border-b-2 border-transparent
                  hover:border-blue-600
                  leading-[22px]
                  md:px-3
                  text-gray-500
                  hover:text-blue-500"
      >
        {title}
      </NavLink>
    </li>
  );
};

export default Navlinks;
