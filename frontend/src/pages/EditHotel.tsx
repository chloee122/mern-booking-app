import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAppContext from "../hook/useAppContext";

function EditHotel() {
  const { id } = useParams();

  const { showToast } = useAppContext();

  const { data: hotel } = useQuery({
    queryKey: ["myHotel"],
    queryFn: () => apiClient.getMyHotelById(id || ""),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () =>
      showToast({ message: "Edit hotel succefully", type: "SUCCESS" }),
    onError: () =>
      showToast({
        message: "Something went wrong. Cannot edit hotel",
        type: "ERROR",
      }),
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-3">Edit Hotel</h1>
        <ManageHotelForm
          onSave={handleSave}
          isLoading={isPending}
          hotel={hotel}
        />
      </div>
    </div>
  );
}

export default EditHotel;
