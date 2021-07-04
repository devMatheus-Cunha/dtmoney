import React, { useEffect, useState, createContext } from "react";
import { authConfig } from "../services/firebase";

export const AuthContext = createContext<any>("");

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		authConfig.auth().onAuthStateChanged((user) => {
			setUser(user);
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
