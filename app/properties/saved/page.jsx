"use client";

import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedProperties = () => {
  const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch(`/api/bookmarks`);
        if (res.status === 200) {
          const userBookmarks = await res.json();
          setBookmarkedProperties(userBookmarks);
        } else {
          console.log(res.statusText);
          toast.error("Failed to load bookmarked Properties.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookmarkedProperties.length === 0 ? (
            <p>No Saved Properties Found. Please Add Some.</p>
          ) : (
            bookmarkedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedProperties;
