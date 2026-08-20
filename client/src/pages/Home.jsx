import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import CardPage from "../components/CardPage.jsx";

const Home = () => {
  return (
    <div className="w-full ">
      <div className="relative z-50">
        <Navbar />
      </div>
      <Hero />
      <CardPage />
    </div>
  );
};

export default Home;
