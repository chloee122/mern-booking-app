import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

function MyHotel() {
  const { data: hotelData } = useQuery({
    queryKey: ["getMyHotels"],
    queryFn: apiClient.getMyHotels,
  });

  if (!hotelData) return <span>No hotels found</span>;

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => {
          return (
            <div
              data-testid="hotel-card"
              key={hotel._id}
              className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border boder-slate-300 rounded-sm p-3 flex items-center text-xs">
                  <BsMap className="mr-1" />
                  <span className="truncate">
                    {hotel.city}, {hotel.country}
                  </span>
                </div>
                <div className="border boder-slate-300 rounded-sm p-3 flex items-center text-xs">
                  <BsBuilding className="mr-1" />
                  <span className="truncate">{hotel.type}</span>
                </div>
                <div className="border boder-slate-300 rounded-sm p-3 flex items-center text-xs">
                  <BiMoney className="mr-1" />
                  <p>
                    €<span className="truncate">{hotel.pricePerNight}</span>
                    /night
                  </p>
                </div>
                <div className="border boder-slate-300 rounded-sm p-3 flex items-center text-xs">
                  <BiHotel className="mr-1 text-lg" />
                  <span className="truncate">
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </span>
                </div>
                <div className="border boder-slate-300 rounded-sm p-3 flex items-center text-xs">
                  <BiStar className="mr-1" />
                  <span className="truncate">
                    {hotel.starRating} Star Rating
                  </span>
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`edit-hotel/${hotel._id}`}
                  className="bg-blue-600 text-white text-sm font-bold p-2 hover:bg-blue-500"
                >
                  View details
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyHotel;
