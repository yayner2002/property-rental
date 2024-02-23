"use client";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";

const PropertyDetailPage = () => {
  const router = useRouter();
  const { propertyId } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const pathName = usePathname();
  console.log(pathName);

  const handldeClick = () => {
    router.replace("/");
  };
  return (
    <div>
      <h2 className="mb-4">
        This is property with an id of {propertyId} owned by {name} and the
        pathName is {pathName}
      </h2>
      <buttton className="bg-blue-500 p-2 mt-8" onClick={handldeClick}>
        Go Back Home
      </buttton>
    </div>
  );
};

export default PropertyDetailPage;
