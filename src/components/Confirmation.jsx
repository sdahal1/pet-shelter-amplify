import { Link } from "react-router-dom"

function Confirmation() {
    return (
        <div>
            <p>Thank you for submitting your application. You can continue browsing available pets <Link to="/pets">here</Link> or return <Link to="/">home</Link>.</p>
        </div>
    )
}

export default Confirmation;