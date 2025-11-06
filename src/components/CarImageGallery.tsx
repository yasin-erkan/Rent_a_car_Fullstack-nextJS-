'use client';

import {useState} from 'react';
import {generateCarImageUrl} from '@/lib/utils';
import {CarImageGalleryProps} from '@/types';

export default function CarImageGallery({car}: CarImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const carName = `${car.make} ${car.modelName}`;

  // Different angles for gallery
  const imageAngles = ['29', '01', '13', '33'];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
      <div className="space-y-3 md:space-y-4">
        {/* Main Image */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-inner">
          <img
            src={generateCarImageUrl(car, imageAngles[selectedImageIndex])}
            alt={carName}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageAngles.map((angle, index) => (
            <button
              key={angle}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-16 md:w-24 md:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'ring-2 ring-blue-500 shadow-lg scale-105'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}>
              <img
                src={generateCarImageUrl(car, angle)}
                alt={`${carName} - View ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
