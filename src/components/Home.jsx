import shelter from "../assets/shelter.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="cta">
      <img src={shelter} alt="A group of adoptable cats and dogs waiting to find their people." />
      <div className="cta-text-wrapper">
        <h2>Welcome</h2>
        <p>
          At Example Organization Pet Shelter, we care for and find loving homes for stray and abandoned pets.
        </p>
        <Link to="/pets" className="btn btn-black">Find your pet today</Link>
      </div>
    </div>

  );
};

export default Home;
