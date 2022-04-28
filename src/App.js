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
import Modal from "./Components/Modal";
// styles
import "./App.scss";

const App = () => {
	const [message, setMessage] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const database = getDatabase(app);
	const dbRef = ref(database);

	const handleDeleteMessage = (messageId) => {
		const dbRef = ref(database, `/${messageId}`);
		remove(dbRef);
	};

	useEffect(() => {
		onValue(dbRef, (response) => {
			const newState = [];
			const messageData = response.val();

			// console.log(messageData);

			for (let key in messageData) {
				// console.log(key);

				newState.push({
					id: key,
					text: messageData[key].text,
					date: messageData[key].date,
				});
			}

			setMessage(newState);
		});
	}, []);

	return (
		<header className="App">
			<h1>Self-love Reminder</h1>
			<h2>Your daily reminder to give yourself some love.</h2>
			<main>
				<Form />

				{message.map((message) => {
					return (
						<div key={message.id} className="message-container">
							<p className="message-text">{message.text}</p>
							<p className="message-date">{message.date}</p>
							<button
								className="delete-button"
								onClick={() => {
									// setOpenModal(true);
									handleDeleteMessage(message.id);
								}}
							>
								Delete
							</button>
						</div>
					);
				})}

				{/* {openModal ? (
					<div className="modal-background">
						<div className="modal-container">
							<div className="title">
								<h3>Are you sure you want to delete it?</h3>
							</div>
							<div className="body"></div>
							<div className="footer">
								<button
									onClick={() => {
										handleDeleteMessage(message.id);
									}}
								>
									Yes, I'm sure!
								</button>
								<button
									onClick={() => {
										setOpenModal(false);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				) : null} */}
			</main>
		</header>
	);
};

export default App;
