import { Link } from "react-router-dom";

function Navbar() {
return (
    <div>
        <nav className="bg-blue-500 shadow px-6 py-4">
            <div className="max-w-4xl mx-auto flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </nav>
    </div>
)
}

export default Navbar