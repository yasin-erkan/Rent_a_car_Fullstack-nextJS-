'use client';

import {useState} from 'react';
import {Star, MessageCircle, ThumbsUp, User} from 'lucide-react';
import {useAuth} from '@/lib/hooks/useAuth';
import {formatDate} from '@/lib/utils';
import {Review, ReviewSectionProps} from '@/types';

export default function ReviewSection({reviews, carId}: ReviewSectionProps) {
  const {user, isAuthenticated} = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      return;
    }

    if (!newReview.comment.trim()) {
      setError('Please write a comment');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId,
          rating: newReview.rating,
          comment: newReview.comment.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      // Reset form
      setNewReview({rating: 5, comment: ''});
      setShowReviewForm(false);

      // Refresh the page to show the new review
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onRatingChange?: (rating: number) => void,
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            onClick={
              interactive && onRatingChange
                ? () => onRatingChange(star)
                : undefined
            }
            className={`${
              interactive
                ? 'hover:text-yellow-400 cursor-pointer'
                : 'cursor-default'
            }`}>
            <Star
              className={`h-4 w-4 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
        <h3 className="text-lg md:text-xl font-bold">
          Reviews ({reviews.length})
        </h3>

        {isAuthenticated && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 text-sm md:text-base font-medium shadow-md hover:shadow-lg">
            <MessageCircle className="h-4 w-4" />
            Write Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-4 md:mb-6 p-3 md:p-4 border-2 border-blue-100 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
          <h4 className="font-bold mb-3 md:mb-4 text-base md:text-lg">
            Write a Review
          </h4>
          <form
            onSubmit={handleSubmitReview}
            className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              {renderStars(newReview.rating, true, rating =>
                setNewReview(prev => ({...prev, rating})),
              )}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={e =>
                  setNewReview(prev => ({...prev, comment: e.target.value}))
                }
                rows={4}
                placeholder="Share your experience with this car..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-xs md:text-sm font-medium">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-200 text-sm md:text-base font-medium shadow-md hover:shadow-lg">
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-3 md:px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <MessageCircle className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 font-medium text-sm md:text-base">
            No reviews yet
          </p>
          <p className="text-xs md:text-sm text-gray-400">
            Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {reviews.map(review => (
            <div
              key={review._id}
              className="border-b border-gray-200 pb-4 md:pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-3 md:gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <User className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">
                        {review.userId.firstName} {review.userId.lastName}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-500">
                        {formatDate(new Date(review.createdAt))}
                      </p>
                    </div>
                    {renderStars(review.rating)}
                  </div>

                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {review.comment}
                  </p>

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 mt-2 md:mt-3">
                    <button className="flex items-center gap-2 text-xs md:text-sm text-gray-500 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="h-3 w-3 md:h-4 md:w-4" />
                      Helpful
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
