import "@/assets/styles/globals.css";
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
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
