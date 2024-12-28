import { InputHTMLAttributes } from "react";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onChangeHandler: (info: string, id: string) => void;
  id: string;
}

export function TextField({
  placeholder,
  onChangeHandler,
  id,
  ...props
}: ITextField) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChangeHandler(e.currentTarget.value, e.currentTarget.id);
  }
  return (
    <input
      className="border border-gray-300 p-2 rounded-lg"
      id={id}
      type="text"
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
