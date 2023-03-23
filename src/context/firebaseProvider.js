import React, { createContext } from 'react';
import app from 'firebase/app';
import 'firebase/functions';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const FirebaseContext = createContext({});

const FirebaseProvider = ({ children }) => {

    let firebase = {
        app: null,
        database: null,
        auth: null,
        functions: null,
        storage: null,
    }

    firebase = {
        app: app.app(),
        auth: app.auth(),
        database: app.database(),
        functions: app.functions(),
        storage: app.storage(),
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    );

}

export {
    FirebaseContext,
    FirebaseProvider,
}
