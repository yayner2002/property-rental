import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <>
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              heading={`For Renters`}
              backgroundColor="bg-gray-100"
              buttonInfo={{
                link: "/properties",
                text: "Browse Properties",
                backgroundColor: "bg-black",
                textColor: "text-white",
              }}
            >
              Find the perfect rental property that suits your needs.
            </InfoBox>
            <InfoBox
              heading={`For Property Owners`}
              backgroundColor="bg-blue-100"
              buttonInfo={{
                link: "/properties/add",
                text: "Add Property",
                backgroundColor: "bg-blue-500",
                textColor: "text-white",
              }}
            >
              List your property and start earning rental income.
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoBoxes;
