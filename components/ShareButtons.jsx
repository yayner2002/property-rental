import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const ShareButtons = ({ property }) => {
  const shareUrlDomain = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="font-bold text-center pt-2 text-xl">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrlDomain}
          quote={property.name}
          hashtag={`${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <EmailShareButton
          url={shareUrlDomain}
          subject={property.name}
          separator=":: "
          body={`Check out this property: ${property.name} \n\n ${property.description} \n\n ${shareUrlDomain}`}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <WhatsappShareButton
          url={shareUrlDomain}
          title={property.name}
          separator=":: "
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={shareUrlDomain}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, " ")}ForRent`]}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={shareUrlDomain}
          title={property.name}
          source={shareUrlDomain}
          summary={`${property.description}`}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
