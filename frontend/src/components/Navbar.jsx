import { Link } from "react-router-dom";

function Navbar() {
return (
    <div>
        <nav className="bg-blue-500 shadow-md">
            <div className="bg-blue-300 max-w-4xl mx-auto flex gap-4">
                <Link 
                to="/"
                className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:scale-105 transition">Home</Link>
                <Link 
                to="/login"
                className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:scale-105 transition">Login</Link>
                <Link 
                to="/signup"
                className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:scale-105 transition">Signup</Link>
            </div>
        </nav>
    </div>
)
}

export default Navbar