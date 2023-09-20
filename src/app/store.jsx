
import { configureStore } from "@reduxjs/toolkit";

import loginReducers from "../features/form/loginSlice";
import profileReducers from "../features/profile/profileSlice";
// import loginSlice from "../features/form/loginSlice";


export const store = configureStore({
    // Reducers
    reducer: {
        // Pour la connexion d'un utilisateur
        login: loginReducers,
        // Pour le profil d'un utilisateur connecté
        profile: profileReducers,
       
    },    
});



