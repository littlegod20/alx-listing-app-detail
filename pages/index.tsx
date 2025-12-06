import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROPERTYLISTINGSAMPLE, HERO_BACKGROUND_IMAGE } from "@/constants";
import { PropertyProps } from "@/interfaces";
import Pill from "@/components/common/Pill";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filters = [
    "Top Villa",
    "Self Checkin",
    "Pool",
    "Free Parking",
    "Pet Friendly",
    "Mountain View",
    "Beachfront",
    "City View",
  ];

  // Helper function to get a valid image source
  const getImageSrc = (imageUrl: string, index: number): string => {
    // If it's a placeholder URL, use local images
    if (imageUrl.startsWith("https://example.com")) {
      // Use available local images, cycling through them
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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
        <Image
          src={HERO_BACKGROUND_IMAGE}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Find your favorite place here!
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              The best prices for over 2 million properties worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-4">
          {filters.map((filter) => (
            <Pill
              key={filter}
              label={filter}
              isActive={selectedFilter === filter}
              onClick={() =>
                setSelectedFilter(selectedFilter === filter ? null : filter)
              }
            />
          ))}
        </div>
      </section>

      {/* Listing Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PROPERTYLISTINGSAMPLE.map(
            (property: PropertyProps, index: number) => (
              <Link
                key={index}
                href={`/property/${encodeURIComponent(property.name)}`}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer block"
              >
                {/* Property Image */}
                <div className="relative w-full h-64">
                  <Image
                    src={getImageSrc(property.image, index)}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  {property.discount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {property.discount}% OFF
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {property.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property.address.city}, {property.address.state},{" "}
                        {property.address.country}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Image
                        src="/assets/Star 2.svg"
                        alt="Star"
                        width={16}
                        height={16}
                      />
                      <span className="text-sm font-medium">
                        {property.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.category.slice(0, 2).map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">
                        ${property.price}
                      </span>
                      <span className="text-gray-600 text-sm"> / night</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {property.offers.bed} bed · {property.offers.shower} bath
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}
