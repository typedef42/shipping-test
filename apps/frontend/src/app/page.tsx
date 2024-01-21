import Footer from "../../components/Footer";
import RouteSearch from "../../components/RouteSearch";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <main className="flex justify-between">
        <div className="flex">
          <div
            className="w-1/2 flex items-center text-white"
            style={{ backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover" }}
          >
            <h1 className="px-5 p-2 text-2xl font-bold">
              Welcome to Hydrapa, your gateway to optimized shipping routes across countries
            </h1>
            <p className="p-6 text-lg">
              At Hydrapa, we specialize in revolutionizing the shipping industry by providing an innovative platform that
              calculates and presents the most cost-effective shipping routes between various countries and ports. Discover our
              platform today – simply choose your departure country and arrival country, and let us guide you to the most
              economical route for your cargo
            </p>
          </div>
          <div className="w-1/2 p-8">
            <RouteSearch />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
