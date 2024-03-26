"use client";

import { fetchProperty } from "@/utils/requests";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditPropertyForm = () => {
  const { propertyId } = useParams();
  console.log(propertyId)
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [formFields, setFormFields] = useState({
    type: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    squareFeet: "",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const fetchPropertyData = async () => {
      try {
        const propertyData = await fetchProperty(propertyId);
        //  setFormFields({
        //   ...propertyData,
        //   rates: {
        //     weekly: propertyData?.rates?.weekly || "",
        //     monthly: propertyData?.rates?.monthly || "",
        //     nightly: propertyData?.rates?.nightly || "",
        //   }
        //  })

        if (propertyData && propertyData.rates) {
          const initialRates = { ...propertyData.rates };
          for (const property in initialRates) {
            if (initialRates[property] === null) {
              initialRates[property] = "";
            }
          }

          propertyData.rates = initialRates;
        }
        setFormFields(propertyData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [objectName, objectKey] = name.split(".");
      setFormFields((prevFormFieldsValue) => ({
        ...prevFormFieldsValue,
        [objectName]: {
          ...prevFormFieldsValue[objectName],
          [objectKey]: value,
        },
      }));
    } else {
      setFormFields((prevFormFieldsValue) => ({
        ...prevFormFieldsValue,
        [name]: value,
      }));
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const updatedAmenities = [...formFields.amenities];
    if (checked) {
      // add the value to the array
      updatedAmenities.push(value);
    } else {
      // remove the value from the array
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    // update the state with the updated array
    setFormFields((prevFormFieldsValue) => ({
      ...prevFormFieldsValue,
      amenities: updatedAmenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        toast.success("Property Updated Successfully");
        router.push(`/properties/${propertyId}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Access Denied");
      } else if (res.status === 404) {
        toast.error("Cannot Find Property");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-semibold mb-6">
          Edit Property
        </h2>

        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Property Type
          </label>
          <select
            value={formFields.type}
            onChange={handleFieldsChange}
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
          >
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Cabin Or Cottage">Cabin or Cottage</option>
            <option value="Room">Room</option>
            <option value="Studio">Studio</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Listing Name
          </label>
          <input
            value={formFields.name}
            onChange={handleFieldsChange}
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Beautiful Apartment In Miami"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            value={formFields.description}
            onChange={handleFieldsChange}
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add an optional description of your property"
          ></textarea>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            value={formFields.location.street}
            onChange={handleFieldsChange}
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
          />
          <input
            value={formFields.location.city}
            onChange={handleFieldsChange}
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
          />
          <input
            value={formFields.location.state}
            onChange={handleFieldsChange}
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
          />
          <input
            value={formFields.location.zipcode}
            onChange={handleFieldsChange}
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Zipcode"
          />
        </div>

        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="beds"
              className="block text-gray-700 font-bold mb-2"
            >
              Beds
            </label>
            <input
              value={formFields.beds}
              onChange={handleFieldsChange}
              type="number"
              id="beds"
              name="beds"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <label
              htmlFor="baths"
              className="block text-gray-700 font-bold mb-2"
            >
              Baths
            </label>
            <input
              value={formFields.baths}
              onChange={handleFieldsChange}
              type="number"
              id="baths"
              name="baths"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="w-full sm:w-1/3 pl-2">
            <label
              htmlFor="squareFeet"
              className="block text-gray-700 font-bold mb-2"
            >
              Square Feet
            </label>
            <input
              value={formFields.squareFeet}
              onChange={handleFieldsChange}
              type="number"
              id="squareFeet"
              name="squareFeet"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Wifi")}
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
              />
              <label htmlFor="amenity_wifi">Wifi</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Full Kitchen")}
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="mr-2"
              />
              <label htmlFor="amenity_kitchen">Full kitchen</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Washer & Dryer")}
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
              />
              <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Free Parking")}
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="mr-2"
              />
              <label htmlFor="amenity_free_parking">Free Parking</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Swimming Pool")}
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
              />
              <label htmlFor="amenity_pool">Swimming Pool</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Hot Tub")}
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="mr-2"
              />
              <label htmlFor="amenity_hot_tub">Hot Tub</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("24/7 Security")}
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="mr-2"
              />
              <label htmlFor="amenity_24_7_security">24/7 Security</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Wheelchair Accessible")}
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="mr-2"
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Wheelchair Accessible
              </label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Elevator Access")}
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="mr-2"
              />
              <label htmlFor="amenity_elevator_access">Elevator Access</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Dishwasher")}
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="mr-2"
              />
              <label htmlFor="amenity_dishwasher">Dishwasher</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Gym/Fitness Center")}
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="mr-2"
              />
              <label htmlFor="amenity_gym_fitness_center">
                Gym/Fitness Center
              </label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Air Conditioning")}
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="mr-2"
              />
              <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Balcony/Patio")}
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="mr-2"
              />
              <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Smart TV")}
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
              />
              <label htmlFor="amenity_smart_tv">Smart TV</label>
            </div>
            <div>
              <input
                onChange={handleAmenitiesChange}
                checked={formFields.amenities.includes("Coffee Maker")}
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="mr-2"
              />
              <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Rates (Leave blank if not applicable)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="weekly_rate" className="mr-2">
                Weekly
              </label>
              <input
                onChange={handleFieldsChange}
                value={formFields.rates.weekly}
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="monthly_rate" className="mr-2">
                Monthly
              </label>
              <input
                onChange={handleFieldsChange}
                value={formFields.rates.monthly}
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="nightly_rate" className="mr-2">
                Nightly
              </label>
              <input
                onChange={handleFieldsChange}
                value={formFields.rates.nightly}
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            onChange={handleFieldsChange}
            value={formFields.seller_info.name}
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            onChange={handleFieldsChange}
            value={formFields.seller_info.email}
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            onChange={handleFieldsChange}
            value={formFields.seller_info.phone}
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Property
          </button>
        </div>
      </form>
    )
  );
};

export default EditPropertyForm;
