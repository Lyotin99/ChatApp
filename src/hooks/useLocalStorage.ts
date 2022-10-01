import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, value: T | (() => T)) => {
	const [state, setState] = useState<T>(() => {
		try {
			const jsonValue = localStorage.getItem(key);

			if (jsonValue !== null) return JSON.parse(jsonValue);

			if (typeof value === "function") {
				return (value as () => T)();
			} else {
				return value;
			}
		} catch (e: unknown) {
			console.log(e);
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(state));
		} catch (e: unknown) {
			console.log(e);
		}
	}, [key, state]);

	return [state, setState] as [typeof state, typeof setState];
};

export default useLocalStorage;
