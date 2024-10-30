import { useState } from "react";
import { calculateDaysInShelter } from "../utils";
import useGetPets from "../hooks/useGetPets";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function Pets() {
  const pets = useGetPets();
  const [filter, setFilter] = useState("");


  const filteredPets = filter
    ? pets.filter((pet) => pet?.species?.toLowerCase() === filter.toLowerCase())
    : pets;

  if (!pets) {
    return null;
  }

  return (
    <>
      <h2>Available pets for adoption</h2>
      <label>
        Filter by species:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Bird">Bird</option>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
          <option value="Fish">Fish</option>
          <option value="Reptile">Reptile</option>
          <option value="Rodent">Rodent</option>
        </select>
      </label>
      <div className="pet-cards-wrapper">
        {filteredPets.length ? filteredPets.map((pet) => (
          <div
            className="pet-card"
            key={
              pet.petId
            }
          >
            <StorageImage
              alt={pet.name || "Name not available"}
              path={pet?.image || ""}
              fallbackSrc="default.jpg"
              width="100"
            />
            <h3>{pet.name}</h3>
            <p>Age: {pet.age}</p>
            <p>Species: {pet.species}</p>
            <p>Date entered: {pet.dateEntered}</p>
            <p>
              In shelter for{" "}
              <strong>{calculateDaysInShelter(pet.dateEntered || "")} days</strong>
            </p>
          </div>
        )) : <p>No pets to display.</p>}
      </div>
    </>
  );
};