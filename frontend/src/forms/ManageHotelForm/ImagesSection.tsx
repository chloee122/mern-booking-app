import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    deletedUrl: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== deletedUrl)
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  className="min-h-full object-cover"
                  src={url}
                  alt="Hotel image"
                />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          aria-label="upload image files"
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0)
                return "At least one image should be added";

              if (totalLength > 6)
                return "Total number of images cannot be more than 6";

              return true;
            },
          })}
        />
        {errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default ImagesSection;
