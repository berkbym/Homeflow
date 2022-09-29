import { FaBookmark } from 'react-icons/fa';
import PlaceHolderImg from './assets/placeholder-house.webp';

function PropertyCard({ property }) {
  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        {/* Added a conditional rendering rule for image. */}
        {
          property.photos[0] ? (
            <img src={`https://mr0.homeflow.co.uk/${property.photos[0]}`} alt={property.display_address} />
          ) : (
            <img src={PlaceHolderImg} alt='' />
          )
        }
        <button className="absolute top-0 right-2" title="Click to bookmark this property">
          <FaBookmark className="text-yellow-400" size="40" />
        </button>

        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">{property.price}</p>
      </div>

      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
