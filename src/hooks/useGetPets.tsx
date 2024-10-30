import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateClient, SelectionSet } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

// Instantiate Amplify Data client
const client = generateClient<Schema>({
    authMode: "identityPool" // This must align with backend authorization 
});

// Specify which fields to return from call to Amplify backend 
const selectionSet = ["petId", "name", "species", "dateEntered", "image", "age"] as const;

// Pull Pet type from Amplify schema with specified fields
type DisplayPet = SelectionSet<Schema["Pet"]["type"], typeof selectionSet>;

// This custom hook fetches pet data from the Amplify backend and puts it in component state
// On success, it returns an array of available pet data 
// On error, it imperatively navigates to the error route
export default function useGetPets() {
    const [pets, setPets] = useState<DisplayPet[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPets() {
            const { data: fetchedPets, errors } = await client.models.Pet.list({ selectionSet });
            if (errors) {
                console.error("Error fetching pets:", errors);
                // Navigate to the error route, passing in the optional state value to store in history state
                // At the destination route, this value can be accessed using useLocation 
                navigate("/error", { state: { error: errors[0]?.message}}); 
            } else {
                setPets(fetchedPets);
            }
        }

        getPets();

    }, [])

    return pets;
}