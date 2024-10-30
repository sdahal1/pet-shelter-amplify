import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../utils';
import { generateClient, SelectionSet } from 'aws-amplify/data';
import { type Schema } from "../../amplify/data/resource";
import { StorageImage } from '@aws-amplify/ui-react-storage';

// Instantiate Amplify Data client
const client = generateClient<Schema>({
  // User pool is for authenticated users, must correspond to backend setup 
  authMode: 'userPool',
})

// Desired fields from AdoptionApplication model
const selectionSet = [
  "petId",
  "applicationId",
  "applicantName",
  "pet.name",
  "pet.species",
  "pet.age",
  "pet.dateEntered",
  "pet.image",
  "email",
  "phone",
  "submittedAt",
] as const;

// Pull in Application model with desired fields
type Application = SelectionSet<Schema["AdoptionApplication"]["type"], typeof selectionSet>;

const ApplicationDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<Application>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function getApplication() {
    const { data: petAdoptionApplication, errors } = await client.models.AdoptionApplication.get(
      {
        applicationId: id || ""
      },
      {
        selectionSet
      }
    );
    if (errors || !petAdoptionApplication) {
      console.log(errors);
      setError("Something went wrong. Please try again later.")
    } else {
      setApplication(petAdoptionApplication);
      setLoading(false);
    }
  }

  useEffect(() => {
    getApplication()
  }, [id]); // Dependency array to re-run the effect when "id" changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!application) {
    return <div>No application found for id {`${id}`}</div>;
  }

  return (
    <div className='adoption-details-wrapper'>
      <div className='adoption-details-card'>
        <button className='btn back-btn' onClick={() => navigate(-1)}>Back to applications</button>
        <p><b>Applicant name:</b> {application.applicantName}</p>
        <p><b>Email:</b> {application.email}</p>
        <p><b>Phone:</b> {application.phone}</p>
        <p><b>Submitted at:</b> {formatDate(application?.submittedAt || "")}</p>
      </div>
      <div className='pet-card'>
        <h3>{application.pet.name}</h3>
        <StorageImage
          alt={application.pet.name || "Pet name unavailable"}
          path={application.pet.image || ""}
          fallbackSrc='default.jpg'
          width="100" />
        <p><b>Species:</b> {application.pet.species}</p>
        <p><b>Age:</b> {application.pet.age}</p>
        <p><b>Date entered:</b> {application.pet.dateEntered}</p>
      </div>
    </div>
  );
};

export default ApplicationDetail;


