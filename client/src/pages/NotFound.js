import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="px-4 py-32 mx-auto max-w-7xl">
      <div className="w-full mx-auto lg:w-1/3">
        <p className="mt-5 mb-3 text-xl text-center font-bold text-black md:text-2xl">
          Page not found (404)
        </p>
        <p className="mb-3 text-base font-medium text-center text-gray-700">
          The page you're looking for may have moved or no longer exists. Head
          back to our{" "}
          <Link to="/" className="underline">
            homepage
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
