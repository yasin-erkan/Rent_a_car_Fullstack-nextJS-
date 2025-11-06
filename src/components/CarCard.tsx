import Link from 'next/link';
import {Fuel, Settings, Star, Users} from 'lucide-react';
import {generateCarImageUrl} from '@/lib/utils';
import {Car, CarCardProps} from '@/types';

export default function CarCard({car, viewMode = 'grid'}: CarCardProps) {
  const carName = `${car.make} ${car.modelName}`;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Car Image */}
          <div className="w-full md:w-64 h-40 overflow-hidden rounded-lg bg-gray-50">
            <img
              src={generateCarImageUrl(car, '01')}
              alt={carName}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Car Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {carName}
                </h3>
                <p className="text-sm text-gray-500">
                  {car.type} • {car.year}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
              {car.averageRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {car.averageRating.toFixed(1)} ({car.totalReviews})
                  </span>
                </div>
              )}
              <span className="text-sm text-gray-600">{car.location}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{car.fuelType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {car.transmission}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{car.seats} seats</span>
              </div>
              <div className="text-sm text-gray-600">
                {car.mileage.toLocaleString()} miles
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {car.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                  ${car.pricePerDay.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">/day</span>
              </div>
              <Link
                href={`/cars/${car._id}`}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors text-center">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {carName}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{car.type}</p>
        </div>
      </div>

      {/* Car Image */}
      <div className="mb-6 h-48 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
        <img
          src={generateCarImageUrl(car, '01')}
          alt={carName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Car Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Fuel className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-500 capitalize">
            {car.fuelType}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-500 capitalize">
            {car.transmission}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {car.seats} People
          </span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-gray-900">
            ${car.pricePerDay.toFixed(2)}/
          </span>
          <span className="text-sm text-gray-500">day</span>
        </div>
        <Link
          href={`/cars/${car._id}`}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer">
          Rent Now
        </Link>
      </div>
    </div>
  );
}
