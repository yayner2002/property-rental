"use client";

import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

const PropertySearchPage = () => {
  const [searchedProperties, setSearchedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const propertyType = searchParams.get("propertyType");

  const query = `?keyword=${keyword}&propertyType=${propertyType}`;

  console.log(searchedProperties);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`/api/properties/search${query}`);

        if (res.status === 200) {
          const data = await res.json();
          setSearchedProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href={`/properties`}
              className="flex items-center text-blue-500 hover:underline mb-3"
            >
              <FaArrowCircleLeft className="mr-2 mb-1" />
              Back To Properties
            </Link>
            <h1 className="mb-4 text-2xl">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchedProperties.length === 0 ? (
                <p className="text-center bg-black-600">
                  No Search Result Found.
                </p>
              ) : (
                searchedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PropertySearchPage;
