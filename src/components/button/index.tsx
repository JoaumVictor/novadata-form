import { classNames } from "../../util/shared";

interface ButtonI {
  label: string;
  type: "primary" | "secondary";
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, type, onClick, disabled }: ButtonI) {
  return (
    <button
      className={classNames(
        type === "primary"
          ? "bg-[#164A8A] disabled:bg-[#263c57fd] text-white"
          : "bg-transparent text-black",
        " rounded-[8px] mt-4 px-4 py-2 text-[14px]"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
