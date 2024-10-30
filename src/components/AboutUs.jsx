import aboutUs from "../assets/about_us_1.jpeg";

const AboutUs = () => {
  return (
    <div className="cta">
      <img src={aboutUs} alt="Adoptable pets looking down toward viewer."  />
      <div className="cta-text-wrapper cta-text-wrapper--center">
        <h2>What we do</h2>
        <p>
          We're a passionate team of animal lovers dedicated to finding loving homes for  rescue animals. Stop by and meet your new best friend today - we guarantee you'll leave with a smile (and maybe a wagging tail)! Come visit us and let the tail-wagging begin!
        </p>
        <h3>Contact information</h3>
        <p>
          <strong>Location:</strong> 123 Any Street, Any Town, USA
        </p>
        <p>
          <strong>Phone:</strong> (123) 555-0100
        </p>
        <a className="btn btn-black" href="mailto:hello@example.org">Email us</a>
      </div>
    </div>
  );
};

export default AboutUs;
