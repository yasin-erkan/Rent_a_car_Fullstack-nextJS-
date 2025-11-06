'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowUpDown, MapPin, Calendar, Search} from 'lucide-react';

export default function SearchSection() {
  const router = useRouter();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  const handleSwap = () => {
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (pickupLocation) params.append('location', pickupLocation);
    if (pickupDate) params.append('startDate', pickupDate);
    if (dropoffDate) params.append('endDate', dropoffDate);

    router.push(`/cars${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 lg:p-8 hover:shadow-xl transition-shadow">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch lg:items-end">
          {/* Pick-Up Section */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-100 shadow-sm"></div>
              <span className="font-bold text-gray-900 text-base md:text-lg">
                Pick-Up
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
                  <select
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                    className="w-full h-12 pl-12 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium appearance-none cursor-pointer hover:border-gray-400 transition-colors">
                    <option value="" className="text-gray-500">
                      Select city
                    </option>
                    <option value="New York, NY">New York</option>
                    <option value="Los Angeles, CA">Los Angeles</option>
                    <option value="Chicago, IL">Chicago</option>
                    <option value="Miami, FL">Miami</option>
                    <option value="San Francisco, CA">San Francisco</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={e => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-12 pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium hover:border-gray-400 transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center lg:justify-start lg:mb-0 mb-2">
            <button
              onClick={handleSwap}
              type="button"
              className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-3.5 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center">
              <ArrowUpDown className="h-5 w-5 lg:h-6 lg:w-6" />
            </button>
          </div>

          {/* Drop-Off Section */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-blue-100 shadow-sm"></div>
              <span className="font-bold text-gray-900 text-base md:text-lg">
                Drop-Off
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
                  <select
                    value={dropoffLocation}
                    onChange={e => setDropoffLocation(e.target.value)}
                    className="w-full h-12 pl-12 pr-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium appearance-none cursor-pointer hover:border-gray-400 transition-colors">
                    <option value="" className="text-gray-500">
                      Select city
                    </option>
                    <option value="New York, NY">New York</option>
                    <option value="Los Angeles, CA">Los Angeles</option>
                    <option value="Chicago, IL">Chicago</option>
                    <option value="Miami, FL">Miami</option>
                    <option value="San Francisco, CA">San Francisco</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
                  <input
                    type="date"
                    value={dropoffDate}
                    onChange={e => setDropoffDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                    className="w-full h-12 pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium hover:border-gray-400 transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            type="button"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 md:px-8 py-3.5 h-12 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 w-full lg:w-auto">
            <Search className="h-5 w-5" />
            <span className="text-base">Search Cars</span>
          </button>
        </div>
      </div>
    </section>
  );
}
