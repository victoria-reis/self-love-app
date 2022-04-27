// SELF LOVE REMINDER APP
// create static jsx (headings, footer, etc)
// import/install firebase and react functions
// create message state
// create state in form component to update database
// display user's input on the page
// create logic to remove user's input from the page (component)

// module
import { useState, useEffect } from "react";
// firebase
import app from "./firebase";
import { getDatabase, ref, onValue, remove } from "firebase/database";
// components
import Form from "./Components/Form";
// styles
import "./App.scss";

const App = () => {
	const [message, setMessage] = useState([]);
	const database = getDatabase(app);
	const dbRef = ref(database);

	useEffect(() => {
		onValue(dbRef, (response) => {
			const newState = [];
			const messageData = response.val();
			for (let key in messageData) {
				newState.push({ id: key, name: messageData[key] });
			}
			setMessage(newState);
		});
	}, []);

	const handleDeleteMessage = (messageId) => {
		const dbRef = ref(database, `/${messageId}`);
		remove(dbRef);
	};

	return (
		<header className="App">
			<h1>Self-love Reminder</h1>
			<h2>Your daily reminder to give yourself some love.</h2>
			<main>
				<Form />

				{message.map((message) => {
					return (
						<div key={message.id}>
							<p>{message.name}</p>
							<button
								onClick={() => {
									handleDeleteMessage(message.id);
								}}
							>
								Delete
							</button>
						</div>
					);
				})}
			</main>
		</header>
	);
};

export default App;
