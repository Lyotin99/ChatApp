interface FormRowProps {
	label: string;
	type: "text" | "file" | "email" | "password";
	id: string;
	name: string;
	required: boolean;
	placeholder?: string;
	changeHandler?: () => void;
}

const FormRow = ({
	id,
	name,
	placeholder,
	required,
	type,
	label,
	changeHandler,
}: FormRowProps) => {
	const isInputFile =
		type === "file" ? (
			<input
				type={type}
				id={id}
				name={name}
				required={required}
				accept="image/*"
				onChange={changeHandler}
			/>
		) : (
			<input
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				required={required}
			/>
		);

	return (
		<div className="form__row">
			<div className="form__label">
				<label htmlFor={id}>{label}</label>
			</div>

			<div className="form__control">{isInputFile}</div>
		</div>
	);
};

export default FormRow;
