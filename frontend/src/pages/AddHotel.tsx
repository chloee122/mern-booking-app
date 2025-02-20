import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import useAppContext from "../hook/useAppContext";

function AddHotel() {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.createHotel,
    onSuccess: () => {
      showToast({ message: "Hotel is successfully created.", type: "SUCCESS" });
    },
    onError: () => {
      showToast({
        message: "Something went wrong. Cannot create hotel.",
        type: "ERROR",
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
}

export default AddHotel;
