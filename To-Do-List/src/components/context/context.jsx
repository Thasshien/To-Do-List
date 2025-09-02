import { createContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const App_Context = createContext();

export const App_Context_Provider = ({ children }) => {

    const url = 'http://localhost:3000';

    const contextValue = {
        url,
    };

    return (
        <App_Context.Provider value={contextValue}>
            {children}
        </App_Context.Provider>
    )
}

export default App_Context_Provider;