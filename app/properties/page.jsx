import PropertyCard from "@/components/PropertyCard";
// import properties from "@/properties.json";

// const fetchProperties = async () => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/properties`
//     );

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to fetch properties.");
//     }
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const PropertyPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`);
  const properties = await res.json();

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <p>No Properties Found. Please Add.</p>
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
