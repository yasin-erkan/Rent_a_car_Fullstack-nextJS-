'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Calendar, MapPin, Clock, CreditCard} from 'lucide-react';
import {useAuth} from '@/lib/hooks/useAuth';
import {formatPrice} from '@/lib/utils';
import {addDays, differenceInDays} from 'date-fns';
import {Car, BookingFormProps} from '@/types';

export default function BookingForm({car}: BookingFormProps) {
  const router = useRouter();
  const {user, isAuthenticated} = useAuth();

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '10:00',
    endTime: '10:00',
    pickupLocation: car.location,
    dropoffLocation: car.location,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate rental duration and total price
  const calculatePrice = () => {
    if (!formData.startDate || !formData.endDate) return null;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = differenceInDays(end, start);

    if (days <= 0) return null;

    const subtotal = days * car.pricePerDay;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return {
      days,
      subtotal,
      tax,
      total,
    };
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const priceCalculation = calculatePrice();
    if (!priceCalculation) {
      setError('Please select valid dates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId: car._id,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalPrice: priceCalculation.total,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          notes: formData.notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const booking: {
        message: string;
        url: string;
      } = await response.json();

      window.location.href = booking.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const priceCalculation = calculatePrice();
  const minDate = new Date().toISOString().split('T')[0];
  const maxDate = addDays(new Date(), 365).toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg border p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg md:text-xl font-bold">Rent this car</h3>
          <div className="text-left sm:text-right">
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {formatPrice(car.pricePerDay)}
            </div>
            <div className="text-xs md:text-sm text-gray-500">per day</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {/* Pickup Date & Time */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Pickup Date & Time
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                min={minDate}
                max={maxDate}
                required
                className="w-full h-11 pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors cursor-pointer text-gray-900 font-medium"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full h-11 pl-10 pr-8 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors cursor-pointer text-gray-900 font-medium appearance-none bg-white">
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
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
        </div>

        {/* Return Date & Time */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Return Date & Time
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={formData.startDate || minDate}
                max={maxDate}
                required
                className="w-full h-11 pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors cursor-pointer text-gray-900 font-medium"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
              <select
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full h-11 pl-10 pr-8 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors cursor-pointer text-gray-900 font-medium appearance-none bg-white">
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
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
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleInputChange}
              placeholder="Enter pickup location"
              required
              className="w-full h-11 pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Drop-off Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none z-10" />
            <input
              type="text"
              name="dropoffLocation"
              value={formData.dropoffLocation}
              onChange={handleInputChange}
              placeholder="Enter drop-off location"
              required
              className="w-full h-11 pl-10 pr-3 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            placeholder="Any special requests or notes..."
            className="w-full px-3 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors text-gray-900 font-medium placeholder:text-gray-400 placeholder:font-normal resize-none"
          />
        </div>

        {/* Price Breakdown */}
        {priceCalculation && (
          <div className="border-t-2 border-gray-100 pt-3 md:pt-4">
            <h4 className="font-bold mb-3 text-sm md:text-base">
              Price Breakdown
            </h4>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Rental ({priceCalculation.days} days)</span>
                <span className="font-medium">
                  {formatPrice(priceCalculation.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium">
                  {formatPrice(priceCalculation.tax)}
                </span>
              </div>
              <div className="border-t-2 border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-sm md:text-base">
                <span>Total</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent text-lg md:text-xl">
                  {formatPrice(priceCalculation.total)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-600 text-sm">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !priceCalculation}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-2.5 md:py-3 px-4 rounded-lg font-bold text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              {isAuthenticated ? 'Proceed to Payment' : 'Login to Book'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
