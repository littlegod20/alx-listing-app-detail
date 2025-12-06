import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
import { useRouter } from "next/router";
import PropertyDetail from "@/components/property/PropertyDetail";
import Layout from "@/components/layout/Layout";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find property by name (URL-encoded)
  const property = PROPERTYLISTINGSAMPLE.find(
    (item) => encodeURIComponent(item.name) === id || item.name === id
  );

  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Property not found</h1>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold transition-colors"
          >
            Go back to listings
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PropertyDetail property={property} />
    </Layout>
  );
}

