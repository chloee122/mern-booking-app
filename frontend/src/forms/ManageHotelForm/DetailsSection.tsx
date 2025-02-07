import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 font-bold text-sm">
        Name
        <input
          type="text"
          {...register("name", { required: "This field is required" })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      {/* <label className="text-gray-700 font-bold text-sm">
        Password
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label> */}
    </div>
  );
}

export default DetailsSection;
