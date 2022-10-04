import { useState, useEffect } from "react";

const useDebounce = (value: any, time: number) => {
	const [debouncedValue, setDebouncedValue] = useState<any>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, time);

		return () => clearTimeout(handler);
	}, [value, time]);

	return debouncedValue;
};

export default useDebounce;
