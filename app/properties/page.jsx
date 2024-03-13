import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const PropertyPage = async () => {
  const properties = await fetchProperties();
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <p>No Properties Found. Please Add Some.</p>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
