import { createContext, useEffect, useReducer } from "react";
import API from "../components/utils/API";

const initialState = {
	isAuthReady: false,
	user: null,
	token: localStorage.getItem("token") || null,
};

export const AuthContext = createContext(initialState);
function authReducer(state: any, action: any) {
	switch (action.type) {
		case "INIT_AUTH":
			return { ...state, user: action.payload, isAuthReady: true };
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
}

interface Props {
	children: JSX.Element;
}

export function AuthProvider({ children }: Props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	useEffect(() => {
		if (state.token) {
			const data = API.fetchData("/users/me", {
				mode: "GET",
				token: state.token,
			}).catch();
			dispatch({ type: "INIT_AUTH", payload: data });
		} else {
			dispatch({ type: "INIT_AUTH" });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}
