import { Star, Clock } from 'lucide-react';

const StoreCard = ({ store }) => {
  return (
    <div className="bg-gray-400 p-6 rounded-lg mb-3 text-center flex flex-col items-center">
      <div className="mb-2 w-full">
        <div className='flex'>

        
        <h3 className="text-lg font-semibold mb-3 text-black">
          {store?.name || "Brite Autowheels Private Limited"}
        </h3>
      </div>
      
      <div className="flex items-center justify-center gap-1 mb-2">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">4.92</span>
      </div>
      
      <div className="flex items-center justify-center text-sm mb-2">
        <span className="text-gray-600">• 4.92 km away •</span>
      </div>
      
      <div className="flex items-center justify-center text-sm mb-3">
        <Clock className="w-4 h-4 mr-1" />
        <span>Opens at 10:00</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        No. A223 Kailash Colony, New Delhi, Delhi, 110048
      </p>
      
      <button className="w-full px-4 py-2 bg-black text-white rounded">
        GET DIRECTIONS
      </button>
      </div>
    </div>
  );
};

export default StoreCard;