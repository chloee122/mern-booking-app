import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="bg-gray-300 grid grid-cols-2 p-6 gap-5">
        <label className="text-gray-700 font-bold text-sm">
          Adults
          <input
            type="number"
            min={1}
            {...register("adultCount", { required: "This field is required" })}
            className="border rounded py-1 px-2 font-normal w-full"
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 font-bold text-sm">
          Children
          <input
            type="number"
            min={0}
            {...register("childCount", { required: "This field is required" })}
            className="border rounded py-1 px-2 font-normal w-full"
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestsSection;
