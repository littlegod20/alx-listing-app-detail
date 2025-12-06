import React, { useState } from "react";
import Image from "next/image";
import { PropertyProps } from "@/interfaces";
import BookingSection from "./BookingSection";
import ReviewSection from "./ReviewSection";

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  const [activeTab, setActiveTab] = useState<"offer" | "reviews" | "host">("offer");

  // Helper function to get image source
  const getImageSrc = (imageUrl: string, index: number): string => {
    if (imageUrl.startsWith("https://example.com")) {
      const localImages = [
        "/assets/image 3.png",
        "/assets/image 4.png",
        "/assets/image 6.png",
        "/assets/image 7.png",
        "/assets/image 8.png",
        "/assets/image 9.png",
        "/assets/image 12.png",
        "/assets/image 17.png",
        "/assets/image 18.png",
        "/assets/image 19.png",
        "/assets/image 21.png",
        "/assets/image 22.png",
        "/assets/image 24.png",
        "/assets/image 25.png",
        "/assets/List 1.png",
        "/assets/List 4.png",
        "/assets/List 9.png",
        "/assets/List 10.png",
        "/assets/List 12.png",
        "/assets/List 13.png",
      ];
      return localImages[index % localImages.length];
    }
    return imageUrl || "/assets/Image 1.png";
  };

  // Get property images - use images array if available, otherwise use single image
  const propertyImages = property.images && property.images.length > 0
    ? property.images
    : [property.image, property.image, property.image, property.image, property.image];

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
          width={20}
          height={20}
          className="inline-block"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500 text-xl">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <div className="flex items-center gap-1">
            {renderStars(property.rating)}
            <span className="text-lg font-semibold ml-1">{property.rating}</span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-700">
            {property.address.city}, {property.address.state}, {property.address.country}
          </span>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 rounded-lg overflow-hidden">
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            src={getImageSrc(propertyImages[0], 0)}
            alt={property.name}
            fill
            className="object-cover rounded-t-lg md:rounded-l-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {propertyImages.slice(1, 5).map((img, index) => (
            <div key={index} className="relative w-full h-48 md:h-[244px]">
              <Image
                src={getImageSrc(img, index + 1)}
                alt={`${property.name} ${index + 2}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Description Section with Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("offer")}
                  className={`pb-4 px-2 font-semibold transition-colors ${
                    activeTab === "offer"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  What we offer
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 px-2 font-semibold transition-colors ${
                    activeTab === "reviews"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab("host")}
                  className={`pb-4 px-2 font-semibold transition-colors ${
                    activeTab === "host"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  About host
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === "offer" && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {property.category.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  {property.description && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {property.description}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {property.reviews && property.reviews.length > 0 ? (
                    <ReviewSection reviews={property.reviews} />
                  ) : (
                    <p className="text-gray-600">No reviews yet.</p>
                  )}
                </div>
              )}

              {activeTab === "host" && (
                <div>
                  {property.host ? (
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={property.host.avatar || "/assets/profile 1.svg"}
                          alt={property.host.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-3">{property.host.name}</h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {property.host.about}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Host information not available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Section */}
        <div className="lg:col-span-1">
          <BookingSection price={property.price} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

