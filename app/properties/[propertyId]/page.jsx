"use client";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyCard from "@/components/PropertyCard";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetail from "@/components/PropertyDetail";
import PropertyHeadImage from "@/components/PropertyHeadImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import Spinner from "@/components/Spinner";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!propertyId) return;
      try {
        const property = await fetchProperty(propertyId);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [propertyId, property]);

  if (!property && !loading) {
    return (
      <h1 classNameName="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner />}
      {!loading && property && (
        <>
          <PropertyHeadImage image={property.images[0]} />{" "}
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-1" /> Back to Properties
              </Link>
            </div>
          </section>
          {/* <!-- Property Info --> */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                {/* // main property details */}
                <PropertyDetail property={property} />
                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />

                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyDetailPage;
