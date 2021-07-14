import React, {
	useEffect, useState, createContext, ReactNode,
} from "react";
import { auth } from "../services/firebase";

// Type
type User = {
	id: string,
}

type AuthContextProviderProps = {
	children: ReactNode
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export const AuthContext = createContext({} as any);

export const AuthProvider = (props: AuthContextProviderProps) => {
	const [user, setUser] = useState<User>()
	useEffect(() => {
		const unsubsribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const { uid } = user

				setUser({
					id: uid,
				})
			}
			return () => {
				unsubsribe()
			}
		})
	}, [user])

	// -------------------------------------------------
	// Render
	// -------------------------------------------------
	return (
		<AuthContext.Provider value={{
			user,
		}}
		>
			{props.children}
		</AuthContext.Provider>

	)
};
