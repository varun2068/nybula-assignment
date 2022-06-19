const Input = ({ label, id, name, type, placeholder, value, onChange }) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-600"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          required={true}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
                        block
                        w-full
                        px-3
                        py-2
                        text-base text-neutral-600
                        placeholder-gray-300
                        transition
                        duration-500
                        ease-in-out
                        transform
                        border border-transparent
                        rounded-lg
                        bg-gray-100
                        focus:outline-none
                        focus:border-transparent
                        focus:ring-2
                        focus:ring-white
                        focus:ring-offset-2
                        focus:ring-offset-blue-700"
        />
      </div>
    </div>
  );
};

export default Input;
