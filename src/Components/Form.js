import { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";

const Form = () => {
	const database = getDatabase(app);
	const dbRef = ref(database);

	const [userInput, setUserInput] = useState("");

	const handleUserInput = (event) => {
		setUserInput(event.target.value);
	};

	const handleUserSubmit = (event) => {
		event.preventDefault();

		if (userInput) {
			push(dbRef, userInput.trim());
			setUserInput("");
		} else {
			alert("Please add a message!");
		}
	};

	return (
		<form
			action="submit"
			method="#"
			className="form"
			name="form"
			onSubmit={(event) => {
				handleUserSubmit(event);
			}}
		>
			<label htmlFor="message" className="sr-only">
				Write something you love about yourself.
			</label>
			<textarea
				name="message"
				id="message"
				onChange={(event) => {
					handleUserInput(event);
				}}
				value={userInput}
				placeholder="Write something you love about yourself..."
			></textarea>

			<button>Submit!</button>
		</form>
	);
};

export default Form;
