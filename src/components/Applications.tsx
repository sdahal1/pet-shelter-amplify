import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from "../utils";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from "../../amplify/data/resource";
import type { SelectionSet } from 'aws-amplify/data';

// Instantiate Amplify Data client
const client = generateClient<Schema>({
    // User pool is for authenticated users, must correspond to Amplify Auth setup
    authMode: 'userPool',
});
// Define fields to read from AdoptionApplication model 
const selectionSet = ["applicationId", "applicantName", "submittedAt"] as const;
// Define custom DisplayApplication type, using AdoptionApplication type from Amplify schema, and fields specified above
type DisplayApplication = SelectionSet<Schema["AdoptionApplication"]["type"], typeof selectionSet>;

const Applications = () => {
    const [applications, setApplications] = useState<Array<DisplayApplication>>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getApplications() {
            const { data: fetchedApplications, errors } = await client.models.AdoptionApplication.list({
                selectionSet
            });
            if (errors) {
                console.error("Error fetching applications:", errors);
                navigate("/error", { state: { error: errors[0]?.errorType } });
            } else {
                setApplications(fetchedApplications);
                setLoading(false);
            }
        }

        getApplications();

    }, []);

    if (loading) {
        return null;
    }

    return (
        <div>
            <h2>Active applications</h2>
            <table>
                <thead>
                    <tr>
                        <th>Applicant name</th>
                        <th>Application submitted on</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* if applications is empty list, show one row that says "No applications to show" */}
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan={7}>No applications to show</td>
                        </tr>
                    ) :
                    applications.map((application) => (
                        <tr key={application.applicationId}>
                            <td>{application.applicantName}</td>
                            <td>{formatDate(application.submittedAt || "")}</td>
                            <td><Link to={`/applications/${application.applicationId}`}>View details</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Applications;
