import {
  Star,
  Fuel,
  Settings,
  Users,
  MapPin,
  Shield,
  Calendar,
} from 'lucide-react';
import {notFound} from 'next/navigation';
import BookingForm from '@/components/BookingForm';
import ReviewSection from '@/components/ReviewSection';
import CarImageGallery from '@/components/CarImageGallery';
import {getCarDetails} from '@/lib/services/car.service';
import {Car, Review} from '@/types';

export default async function CarDetailsPage({params}: {params: {id: string}}) {
  let car: Car | null = null;
  let reviews: Review[] = [];

  try {
    const data = await getCarDetails(params.id);
    car = data.car;
    reviews = data.reviews || [];
  } catch (error) {
    notFound();
  }

  if (!car) {
    notFound();
  }

  const carName = `${car.make} ${car.modelName}`;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Car Images */}
          <CarImageGallery car={car} />

          {/* Car Details */}
          <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {carName}
                </h1>
                <p className="text-base md:text-lg text-gray-600">
                  {car.type} • {car.year}
                </p>
              </div>
            </div>

            {/* Rating and Location */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-6">
              {car.averageRating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-zinc-800">
                    {car.averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-600">
                    ({car.totalReviews} reviews)
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{car.location}</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Fuel className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Fuel Type</p>
                  <p className="font-semibold capitalize">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold capitalize">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-semibold">{car.seats} People</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Mileage</p>
                  <p className="font-semibold">
                    {car.mileage.toLocaleString()} miles
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {car.description}
              </p>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">
                  Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          <ReviewSection reviews={reviews} carId={params.id} />
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <BookingForm car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}
