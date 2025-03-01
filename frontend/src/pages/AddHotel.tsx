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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <ManageHotelForm onSave={handleSave} isLoading={isPending} />
    </div>
  );
}

export default AddHotel;
