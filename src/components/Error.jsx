import { Link, useLocation } from 'react-router-dom';

const Error = () => {
    const { state } = useLocation();
    const errorMessage = state && state.error ? state.error : 'An unexpected error occurred. Please try again later.';

    return (
        <div>
            <h2>Error</h2>
            <p>Error message: {errorMessage}</p>
            <p>Choose the following link to return to the home page: <Link to="/">Home</Link></p>
        </div>
    );
};

export default Error;