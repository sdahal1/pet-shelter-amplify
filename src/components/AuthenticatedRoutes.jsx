import { Outlet, Navigate } from 'react-router-dom';
import { useAuthenticator } from "@aws-amplify/ui-react"

function AuthenticatedRoutes() {
    const { authStatus } = useAuthenticator(context => [context.authStatus]);

    if (authStatus === 'authenticated' || authStatus === 'configuring') {
        return <Outlet />
    }

    return <Navigate to="/login" />
}

export default AuthenticatedRoutes;