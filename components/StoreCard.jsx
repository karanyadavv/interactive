import { Star, Clock, Phone, Navigation, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const StoreCard = ({ store }) => {
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const isOpen = () => {
    const now = new Date();
    const day = now.getDay();
    const time = now.getHours() * 100 + now.getMinutes();

    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDay = days[day];

    const openTime = store?.dealerOperationHours?.[`${currentDay}OpenTime`];
    const closeTime = store?.dealerOperationHours?.[`${currentDay}CloseTime`];

    if (!openTime || !closeTime) return false;

    const [openHour, openMinute] = openTime.split(":").map(Number);
    const [closeHour, closeMinute] = closeTime.split(":").map(Number);

    const openTimeNum = openHour * 100 + openMinute;
    const closeTimeNum = closeHour * 100 + closeMinute;

    return time >= openTimeNum && time <= closeTimeNum;
  };

  const getCurrentDayCloseTime = () => {
    const now = new Date();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDay = days[now.getDay()];
    return store?.dealerOperationHours?.[`${currentDay}CloseTime`];
  };

  if (!store) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <Link
          to={`/store/${store.dealerId}`}
          className="hover:text-white transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {store.name || "Store Name"}
          </h3>
        </Link>
        <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100">
          {store.type || "Location"}
        </span>
      </div>

      {store.averageRating > 0 && (
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">
            {store.averageRating.toFixed(1)}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>
          {isOpen() ? "Open Now" : "Closed"}
          {isOpen() && getCurrentDayCloseTime() && (
            <span className="text-gray-500">
              {" "}
              · Closes at {formatTime(getCurrentDayCloseTime())}
            </span>
          )}
        </span>
      </div>

      {store.phoneNumber && (
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <a href={`tel:${store.phoneNumber}`} className="hover:text-black">
            {store.phoneNumber}
          </a>
        </div>
      )}

      {(store.address || store.pincode) && (
        <p className="text-sm text-gray-600 mb-4 flex items-start gap-2">
          <Building2 className="w-4 h-4 mt-1 flex-shrink-0" />
          <span>
            {[store.address, store.pincode].filter(Boolean).join(", ")}
          </span>
        </p>
      )}

      {store.gmbMapUrl && (
        <div className="flex gap-2">
          <a
            href={store.gmbMapUrl}
            target="_blank"
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default StoreCard;
