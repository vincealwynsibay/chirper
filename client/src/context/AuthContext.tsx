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
		const fetchData = async () => {
			const data = await API.fetchData("/users/me", {
				mode: "GET",
				token: state.token,
			});

			dispatch({ type: "INIT_AUTH", payload: data });
		};

		if (state.token) {
			fetchData();
		} else {
			dispatch({ type: "INIT_AUTH", payload: null });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
}
