import React, { createContext } from 'react';

export const AuthContext = createContext();


const AuthContextProvider = ({children}) => {


    // const [user, setUser] = useState(null);

    const user = 'Taos'


    
    

    

    const authInfo = {
        user,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;