import { Navigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

// The Login component wraps the Amplify Authenticator
// It provides additional logic to see if the user is already logged in
    // If they are, it navigates them to the root route
function LogIn() {
    const { authStatus } = useAuthenticator((context) => [
        context.authStatus
    ])

    if (authStatus === 'authenticated') {
        return <Navigate to="/" />
    }

    // In development allow users to sign up
    return <Authenticator /> 
    // Hide the sign up tab so that public users cannot sign up and access business data 
    // return <Authenticator hideSignUp /> 
}

export default LogIn;