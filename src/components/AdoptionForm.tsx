import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from "../../amplify/data/resource";
import { v4 as uuidv4 } from 'uuid';
import useGetPets from '../hooks/useGetPets';

// Instantiate Amplify Data client
const client = generateClient<Schema>({
  // Identity pool for guest users, must correspond to Amplify backend
  authMode: 'identityPool',
});

const AdoptionForm = () => {
  const pets = useGetPets();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petId: ''
  });
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newApplication = {
      applicationId: uuidv4(), // Generate a new UUID
      applicantName: formData.name,
      email: formData.email,
      phone: formData.phone,
      petId: formData.petId,
      submittedAt: new Date().toISOString() // Add the current timestamp here
    };

    const { data: adoptionApplication, errors } = await client.models.AdoptionApplication.create(newApplication);

    if (errors) {
      console.error("Error creating application:", errors);
      setErrors(errors[0].message);
    } else {
      console.log("Application created:", adoptionApplication);
      navigate("/confirmation");
    }
  }

  return (
    <form className="adoption-form" onSubmit={handleSubmit}>
      {errors ? <div className="error">{JSON.stringify(errors)}</div> : null}
      <div className="form-group">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Your phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="123-456-7890"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="petId">Select pets:</label>
        <select
          id="petId"
          name="petId"
          onChange={handleChange}
          required
          defaultValue={""}
        >
          <option disabled value={""}>Select a pet</option>
          {pets.map((pet) => (
            <option key={pet.petId} value={pet.petId}>
              {pet.name} (ID: {pet.petId})
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <button type="submit" className='btn btn-black'>Submit</button>
      </div>
    </form>
  );
};

export default AdoptionForm;
