
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { myContext } from '../contextApi/Authcontext';


const PrivetRouting = ({children}) => {
    const {user,loading} = useContext(myContext)
    const location = useLocation();
    if(loading){
         return <h2>Loadding...</h2>
    }
    if (user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;

    

    
};

export default PrivetRouting;