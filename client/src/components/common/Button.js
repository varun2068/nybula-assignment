const Button = ({ text }) => {
  return (
    <div>
      <button
        type="submit"
        className="
                      flex
                      items-center
                      justify-center
                      w-full
                      px-10
                      py-3
                      text-base
                      font-medium
                      text-center text-white
                      transition
                      duration-500
                      ease-in-out
                      transform
                      bg-blue-600
                      rounded-xl
                      hover:bg-blue-700                
                    "
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
