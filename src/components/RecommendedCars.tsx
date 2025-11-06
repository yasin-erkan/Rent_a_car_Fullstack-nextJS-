import Link from 'next/link';
import {getRecommendedCars} from '@/lib/services/car.service';
import CarCard from './CarCard';

export default async function RecommendedCars() {
  const recommendedCars = await getRecommendedCars();

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            Recommended Cars
          </h2>
          <p className="text-gray-500">Hand-picked for you</p>
        </div>
        <Link
          href="/cars"
          className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 group">
          View All
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {recommendedCars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* Show More Cars Button */}
      <div className="text-center mt-12">
        <Link
          href="/cars"
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold inline-flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105">
          Show More Cars
          <span className="text-lg">→</span>
        </Link>
      </div>
    </section>
  );
}
