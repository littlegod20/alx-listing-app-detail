import React from "react";
import Image from "next/image";
import { ReviewProps } from "@/interfaces";

const ReviewSection: React.FC<{ reviews: ReviewProps[] }> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={i}
          src="/assets/Star 2.svg"
          alt="Star"
          width={16}
          height={16}
          className="inline-block"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">
          ★
        </span>
      );
    }

    return stars;
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <p className="text-gray-600">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-6">Reviews</h3>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={review.avatar || "/assets/profile 1.svg"}
                  alt={review.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-bold text-lg">{review.name}</p>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;

