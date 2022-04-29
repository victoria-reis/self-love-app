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
	// const dbRef = ref(database);

	const handleDeleteMessage = (messageId) => {
		const dbRef = ref(database, `/${messageId}`);
		remove(dbRef);
	};

	useEffect(() => {
		const database = getDatabase(app);
		const dbRef = ref(database);
		onValue(dbRef, (response) => {
			const newState = [];
			const messageData = response.val();

			for (let key in messageData) {
				newState.push({
					id: key,
					text: messageData[key].text,
					date: messageData[key].date,
				});
			}
			setMessage(newState.reverse());
		});
	}, []);

	return (
		<>
			<main className="App wrapper">
				<h1>Self-love Reminder</h1>
				<h2>Your daily reminder to give yourself some love 🤍</h2>

				<Form />
				<div className="messages-flex-container wrapper">
					{message.map((message) => {
						return (
							<div key={message.id} className="message-container">
								<p className="message-text">"{message.text}"</p>
								<p className="message-date">{message.date}</p>
								<button
									className="delete-button"
									onClick={() => {
										handleDeleteMessage(message.id);
									}}
								>
									Delete
								</button>
							</div>
						);
					})}
				</div>
			</main>
			<footer>
				<p>
					Created at
					<a href="https://junocollege.com/"> Juno College of Technology</a>
				</p>
			</footer>
		</>
	);
};

export default App;
