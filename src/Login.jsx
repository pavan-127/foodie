import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "pavan" && password === "pavan") {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username); // Store username
            alert("Login successful! You can now purchase items.");
            navigate("/"); // Redirect to home
        } else {
            alert("Invalid username or password");
        }
    };

    // Handle Logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        setUsername("");
        setPassword("");
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg text-center">
                <h2 className="mb-3">{isLoggedIn ? `Welcome, ${username}!` : "Login"}</h2>

                {!isLoggedIn ? (
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                      
                    </form>
                    
                ) : (
                    <>
                        <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
                     
                    </>
                    
                    
                )}
                
            </div>
           
        </div>
        
    );
}

export default Login;
