import Link from "next/link";
import React from "react";

const InfoBox = ({
  heading,
  children,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
}) => {
  return (
    <>
      <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
        <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
        <p className="mt-2 mb-4">{children}</p>
        <Link
          href={buttonInfo.link}
          className={`inline-block ${buttonInfo.backgroundColor} ${buttonInfo.textColor} rounded-lg px-4 py-2 hover:opacity-75 focus:outline-none focus:ring focus:ring-blue-500`}
        >
          {buttonInfo.text}
        </Link>
      </div>
    </>
  );
};

export default InfoBox;
