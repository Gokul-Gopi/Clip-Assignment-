import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = () => {
    const { authState } = useAuth();
    console.log(authState.isLoggedIn)
    return authState.isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
}
export default PrivateRoute


// const PrivateRoute = () => {
//     const auth = null; // determine if authorized, from context or however you're doing it

//     // If authorized, return an outlet that will render child elements
//     // If not, return element that will navigate to login page
//     return auth ? <Outlet /> : <Navigate to="/login" />;
// }