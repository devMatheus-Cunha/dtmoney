import React, {
	useEffect, useState, createContext, ReactNode,
} from "react";
import { auth } from "../services/firebase";

// Type
type User = {
	id: string,
  emailUser: string | null,
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<any>("");

export const AuthProvider = (props: AuthContextProviderProps) => {
	const [user, setUser] = useState<User>()
	const [userId, setUserId] = useState<any>("")
	useEffect(() => {
		const unsubsribe = auth.onAuthStateChanged((user) => {
			if (user) {
				const { email, uid } = user

				setUser({
					id: uid,
					emailUser: email,
				})
			}
			return () => {
				unsubsribe()
			}
		})
	}, [user])
	return (
		<AuthContext.Provider value={{
			user, userId, setUserId, setUser,
		}}
		>
			{props.children}
		</AuthContext.Provider>

	)
};
