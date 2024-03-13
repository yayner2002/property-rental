import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      userId: session.user.id,
      user: session.user,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
