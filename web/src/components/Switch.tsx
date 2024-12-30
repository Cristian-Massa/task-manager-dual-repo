import { InputHTMLAttributes } from "react";

interface ISwitch extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor: string;
}

export function Switch({ htmlFor, ...props }: ISwitch) {
  return (
    <div className="flex items-center">
      <label htmlFor={htmlFor} className="relative inline-block w-8 h-4">
        <input
          type="checkbox"
          id={htmlFor}
          className="sr-only peer"
          {...props}
        />
        <span className="block w-full h-full bg-gray-300 rounded-full transition-all"></span>
        <span className="dot absolute left-1 top-[2px] w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-3 peer-checked:bg-container-header"></span>
      </label>
    </div>
  );
}
