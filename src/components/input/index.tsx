import { classNames } from "../../util/shared";

interface InputI {
  label: string;
  value: string;
  name: string;
  onChange: (e: any) => void;
  error: string | undefined;
  touched: boolean | undefined;
  handleBlur: (e: any) => void;
  placeholder: string;
}

function Input({
  touched,
  handleBlur,
  name,
  label,
  value = "",
  onChange,
  error,
  placeholder,
}: InputI) {
  return (
    <div className="flex flex-col items-start justify-center w-full my-4 flex-nowrap">
      <div className="flex items-center justify-between w-full">
        <label
          className="text-[12px] text-[#505E7B] font-ubuntu-bold"
          htmlFor="email"
        >
          {label}
        </label>
        {error && touched && (
          <span className="font-bold text-red-500 text-[12px]">{error}</span>
        )}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        className={classNames(
          "w-full h-12 border outline-none rounded-[8px] text-[#505E7B] px-4 focus:border-[#524E93]",
          error && touched ? "border-red-500" : "border-gray-300"
        )}
        onBlur={handleBlur}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
