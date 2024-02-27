import RequiredLabel from "../RequiredLabel";
import { get, RegisterOptions, useFormContext } from "react-hook-form";
import "./input.css";
import clsx from "clsx";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  defaultValue?: string;
};

export default function Input({
  id,
  type = "text",
  label,
  required,
  className,
  validation,
  disabled,
  defaultValue,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="label">
          {label} {required && <RequiredLabel />}
        </label>
      )}
      <input
        {...register(id, validation)}
        type={type}
        id={id}
        name={id}
        className={clsx("input", className, error && "error-input")}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {error && <span className="error-text">{error.message}</span>}
    </div>
  );
}
