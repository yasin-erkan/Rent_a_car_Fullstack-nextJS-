import Link from 'next/link';
import {getPopularCars} from '@/lib/services/car.service';
import CarCard from './CarCard';

export default async function PopularCars() {
  const popularCars = await getPopularCars();

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            Popular Cars
          </h2>
          <p className="text-gray-500">Most rented vehicles this month</p>
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
        {popularCars.map(car => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </section>
  );
}
