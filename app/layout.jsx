import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export const metadata = {
  title: "Property | Find the Perfect Rental",
  description:
    "Find the perfect rental property with Property. We have a wide range of properties to rent in your area",
  keywords:
    "property, rent, rental, house, apartment, flat, home, real estate, property management, property management software",
};
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
