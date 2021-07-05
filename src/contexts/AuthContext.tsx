import React, { useEffect, useState, createContext } from "react";
import { authConfig } from "../services/firebase";

// Type
type User = {
	id: string,
  // email: string,
  // password: string,
}

export const AuthContext = createContext<any>("");

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		authConfig.auth().onAuthStateChanged((user) => {
			if (user) {
				const { uid } = user

				setUser({
					id: uid,
				})
			}
		});
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};
