import React, { useState } from 'react';
import styles from './Sign_in.module.css';
import { useNavigate, Link } from 'react-router-dom';

const Sign_in = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	const handleSubmit = async (e) => {

		/*STOP RELOADING: Stop the form from reloading the page*/
		e.preventDefault();

		/*INPUT VALIDATION: Check if both fields are filled otherwise show an alert and return*/
		if (!username || !password) {
			alert("Please fill in both fields");
			return;
		}


		/*TRY SENDING DATA TO BACKEND: Send the username and password to the backend*/
		try {
			const res = await fetch("http://172.19.48.43:5001/api/auth", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			console.log("Server response:", data);
		}
		/*ON FAIL LOG ERROR MESSAGE: Alert the user that login failed, function does not fail*/
		catch (err) {
			console.error("Error logging in:", err);
		}
	};


	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				type="text"
				value={username} onChange={(e) => setUsername(e.target.value)}
				className={styles.input}
				placeholder="Username"
			/>
			<input
				type="password"
				value={password} onChange={(e) => setPassword(e.target.value)}
				className={styles.input}
				placeholder="Password"
			/>
		<button type="submit" className={styles.button}> Sign In</button>
		<p>Don’t have an account? <Link to="/register">Register</Link></p>
	</form>
  );
};

export default Sign_in;
