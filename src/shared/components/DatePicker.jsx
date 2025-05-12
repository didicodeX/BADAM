// shared/components/DatePicker.jsx
import { Calendar } from "lucide-react";
import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

export default function DatePicker({ control, name, label, error }) {
  return (
    <div className="relative inline-flex flex-col w-60">
      <label
        htmlFor={name}
        className="text-sm font-medium text-text-700 absolute -top-3 left-2 bg-background-50 px-2"
      >
        {label}
      </label>
      <div
        className={` flex border ${
          error ? "border-error-500" : "border-text-200"
        } rounded px-3 py-2 bg-transparent text-sm`}
      >
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <ReactDatePicker
              id={name}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              className=" focus:outline-none bg-transparent"
              calendarClassName="!bg-background-50"
              placeholderText="Choisissez une date"
            />
          )}
        />
        <Calendar className="w-4 h-4 " />
      </div>
      {error && <p className="text-xs text-error-600 mt-1">{error.message}</p>}
    </div>
  );
}
