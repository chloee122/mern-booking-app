import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <label className="text-gray-700 font-bold text-sm flex-1">
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
      <div className="flex gap-4">
        <label className="text-gray-700 font-bold text-sm flex-1">
          City
          <input
            type="text"
            {...register("city", {
              required: "This field is required",
            })}
            className="border rounded py-1 px-2 font-normal w-full"
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-bold text-sm flex-1">
          Country
          <input
            type="text"
            {...register("country", {
              required: "This field is required",
            })}
            className="border rounded py-1 px-2 font-normal w-full"
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 font-bold text-sm flex-1">
        Description
        <textarea
          rows={10}
          {...register("description", {
            required: "This field is required",
          })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-bold text-sm max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          {...register("pricePerNight", {
            required: "This field is required",
          })}
          className="border rounded py-1 px-2 font-normal w-full"
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-bold text-sm max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", { required: "This field is required" })}
          className="border rounded w-full p-2 text-gray-800 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}

export default DetailsSection;
