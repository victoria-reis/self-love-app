import app from "../firebase";
import { getDatabase, ref, remove } from "firebase/database";

const Modal = ({ closeModal, deleteFunction }) => {
	// const handleDeleteMessage = (messageId) => {
	// 	const database = getDatabase(app);
	// 	const dbRef = ref(database, `/${messageId}`);
	// 	remove(dbRef);
	// };
	// return (
	// 	<div className="modal-background">
	// 		<div className="modal-container">
	// 			<div className="title">
	// 				<h3>Are you sure you want to delete it?</h3>
	// 			</div>
	// 			<div className="body"></div>
	// 			<div className="footer">
	// 				<button onClick={deleteFunction}>Yes, I'm sure!</button>
	// 				<button
	// 					onClick={() => {
	// 						closeModal(false);
	// 					}}
	// 				>
	// 					Cancel
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export default Modal;
