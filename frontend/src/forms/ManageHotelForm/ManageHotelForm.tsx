import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageUrls: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

interface Props {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
}

function ManageHotelForm({ onSave, isLoading, hotel }: Props) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataObj: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataObj.name);
    formData.append("city", formDataObj.city);
    formData.append("country", formDataObj.country);
    formData.append("description", formDataObj.description);
    formData.append("type", formDataObj.type);
    formData.append("pricePerNight", formDataObj.pricePerNight.toString());
    formData.append("starRating", formDataObj.starRating.toString());
    formData.append("adultCount", formDataObj.adultCount.toString());
    formData.append("childCount", formDataObj.childCount.toString());

    formDataObj.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataObj.imageUrls) {
      formDataObj.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataObj.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white font-bold text-xl p-2 bg-blue-600 enabled:hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
