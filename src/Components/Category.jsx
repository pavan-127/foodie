import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Category() {
    const cart = useSelector(state => state.cart);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const navigate = useNavigate();

    const [currentLocation, setCurrentLocation] = useState("Fetching location...");
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("username") || null);
    

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
    
                        // Extract City and Mandal (sub-district)
                        const city = data.address.city || data.address.town || data.address.village || "Unknown City";
                        const mandal = data.address.county || data.address.suburb || "Unknown Mandal";
    
                        setCurrentLocation(`${city}, ${mandal}`);
                    } catch (error) {
                        setCurrentLocation("Unable to fetch location");
                    }
                },
                () => setCurrentLocation("Location permission denied")
            );
        } else {
            setCurrentLocation("Geolocation not supported");
        }
    }, []);
    

    // Listen for login changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedInUser(localStorage.getItem("username"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setLoggedInUser(null);
        navigate("/login");
    };

    return (
        <>
        
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
                <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-danger" to="/Home" onClick={() => window.location.href = '/Home'}>🍽️ Foodie Buddie</Link>

                    {/* Location Display */}
                    <span className="text-light ms-3">📍 {currentLocation}</span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-light fw-bold" to="/Home">🏠 Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-success fw-bold" to="/veg-items">🥦 Veg</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-danger fw-bold" to="/non-veg-items">🍗 Non-Veg</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-warning fw-bold" to="/dessert">🍰 Desserts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light fw-bold" to="/orders">📦 Orders</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light fw-bold" to="/about-us">ℹ️ About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light fw-bold" to="/contact-us">ℹ️ Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Login & Cart Buttons */}
                    <div className="d-flex align-items-center">
                        {/* Conditional Rendering for Login Button or Username Dropdown */}
                        {!loggedInUser ? (
                            <Link to="/login" className="btn btn-outline-light me-2">🔑 Login</Link>
                        ) : (
                            <div className="dropdown me-2">
                                <button className="btn btn-warning  d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                                    <img src="public/image/Login.png" alt="" className="login-icon me-2" />
                                    {loggedInUser}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                                            🚪 Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Cart Button */}
                        <Link to="/cart" className="btn btn-warning position-relative">
                            🛒 Cart 
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export { Category };
