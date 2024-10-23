import { Star, Clock } from 'lucide-react';

const StoreCard = ({ store }) => {
  return (
    <div className="bg-gray-400 rounded-lg">
        
      <h3 className="text-lg font-semibold  text-blue-600">
        {store?.name || "Brite Autowheels Private Limited"}
      </h3>
      
      <div className="flex items-center justify-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">4.92</span>
      </div>
      
      <div className="text-sm ">
        <span className="text-gray-600">• 4.92 km away •</span>
      </div>
      
      <div className="flex items-center justify-center text-sm ">
        <Clock className="w-4 h-4 mr-1" />
        <span>Opens at 10:00</span>
      </div>
      
      <p className="text-sm text-gray-600">
        No. A223 Kailash Colony, New Delhi, Delhi, 110048
      </p>
      
      <button className="w-full px-4 py-2 bg-black text-white rounded">
        GET DIRECTIONS
      </button>
    </div>
  );
};

export default StoreCard;