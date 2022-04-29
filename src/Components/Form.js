import { useState } from "react";
import app from "../firebase";
import { getDatabase, ref, push } from "firebase/database";

const Form = () => {
	// firebase variables
	const database = getDatabase(app);
	const dbRef = ref(database);
	// user's input state
	const [userInput, setUserInput] = useState("");
	// date variables
	const today = new Date();
	const messageDate = today.toLocaleString("default", {
		weekday: "short",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const handleUserInput = (event) => {
		setUserInput(event.target.value);
	};

	const handleUserSubmit = (event) => {
		event.preventDefault();

		if (userInput.trim()) {
			push(dbRef, { text: userInput, date: messageDate });
			// console.log(messageDate);
			setUserInput("");
		} else {
			alert("Please add a message!");
			setUserInput("");
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
				maxLength="60"
			></textarea>

			<button>Submit!</button>
		</form>
	);
};

export default Form;
