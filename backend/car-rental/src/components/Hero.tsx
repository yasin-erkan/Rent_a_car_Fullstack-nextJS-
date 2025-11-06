import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Left Banner */}
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl md:rounded-2xl p-5 md:p-8 text-white relative overflow-hidden min-h-[280px] md:min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent"></div>

          <div className="relative z-10 max-w-full md:max-w-[58%] pr-16 md:pr-0">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-2 md:mb-3">
              ⚡ Best Prices
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">
              The Best Platform
              <br />
              for Car Rental
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4 md:mb-5 leading-relaxed">
              Ease of doing a car rental safely and reliably. Of course at a low
              price.
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Rental Car
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Car Image */}
          <div className="absolute right-0 bottom-0 w-[50%] md:w-[65%] h-[45%] md:h-[55%]">
            <Image
              src="/car-1.png"
              alt="Sports Car"
              fill
              className="object-contain object-bottom-right"
              priority
            />
          </div>
        </div>

        {/* Right Banner */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-xl md:rounded-2xl p-5 md:p-8 text-white relative overflow-hidden min-h-[280px] md:min-h-[320px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-700/10 to-transparent"></div>

          <div className="relative z-10 max-w-full md:max-w-[58%] pr-16 md:pr-0">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-2 md:mb-3">
              💰 Low Rates
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">
              Easy way to rent
              <br />a car at a low price
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mb-4 md:mb-5 leading-relaxed">
              Providing cheap car rental services and safe and comfortable
              facilities.
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50 px-5 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Rental Car
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Car Image */}
          <div className="absolute right-0 bottom-0 w-[50%] md:w-[65%] h-[45%] md:h-[55%]">
            <Image
              src="/car-2.png"
              alt="Luxury Car"
              fill
              className="object-contain object-bottom-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
