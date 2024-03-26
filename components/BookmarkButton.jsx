"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  const [isBookmarked, setIsbookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!userId){
      setIsLoading(false);
      return;
    }
    const getBookmarkStatus = async () => {
      try {
        const res = await fetch(`/api/bookmarks/check`, {
          method: "POST",
          body: JSON.stringify({
            propertyId: property._id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsbookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      finally {
        setIsLoading(false);
      }

    };

    getBookmarkStatus();
  }, [userId, property._id]);

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("Please login to bookmark this property");
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        body: JSON.stringify({
          propertyId: property._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsbookmarked(data.isBookmarked);
      } else if (res.status === 400) {
        toast.error("You cannot bookmark your own property");
        return;
      } else if (res.status === 500) {
        toast.error("Something went wrong");
        return;
      } else {
        toast.error("Unauthorized");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Remove from bookmarks
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
