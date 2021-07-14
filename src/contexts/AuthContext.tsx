import React, {
	useEffect, useState, createContext, ReactNode,
} from "react";
import { auth } from "../services/firebase";

// Type
type User = {
	id: string,
  emailUser: string | null,
	userName: string | null
}

type AuthContextProviderProps = {
  children: ReactNode
}

// -------------------------------------------------
// Export Function
// -------------------------------------------------
export const AuthContext = createContext<any>("");

export const AuthProvider = (props: AuthContextProviderProps) => {
	const [user, setUser] = useState<User>()
	const [userDataCreate, setDataCreate] = useState<any>({})
	useEffect(() => {
		const unsubsribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const { email, uid, displayName } = user

				setUser({
					id: uid,
					emailUser: email,
					userName: displayName,
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
			user, userDataCreate, setDataCreate, setUser,
		}}
		>
			{props.children}
		</AuthContext.Provider>

	)
};
