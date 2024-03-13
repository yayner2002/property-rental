import Image from "next/image";
import React from "react";

const PropertyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            property={true}
            height={400}
            width={1800}
            className="object-cover h-[400px] mx-auto rounded-xl"
            alt="Property Image"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index == 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  priority={true}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="object-cover h-[400px] w-full rounded-xl"
                  alt="Property Image"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
