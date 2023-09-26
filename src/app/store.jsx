
import { configureStore } from "@reduxjs/toolkit";

import loginReducers from "./loginSlice";
import profileReducers from "./profileSlice";


export const store = configureStore({
    // Reducers
    reducer: {
        // Pour la connexion d'un utilisateur
        login: loginReducers,
        // Pour le profil d'un utilisateur connecté
        profile: profileReducers,
       
    },    
});



