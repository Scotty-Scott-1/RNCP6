import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';

const Signupform = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		username: "",
		password: "",
		companyName: "",
		companyAddress: "",
		companyWebsite: "",
		agree: false
	});

	const handleChange = (e) => {
  		const { name, value, type, checked } = e.target;
		let newValue

		if (type === "checkbox") {
		    newValue = checked;
		} else {
		    newValue = value;
		}
		setFormData(prev => ({
			...prev,
			[name]: newValue
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		});

		console.log("Submitting form data:");
		console.table(formData);

		const newUser = await res.json();

		if (res.ok) {
			console.log("User created successfully:");
			console.table(newUser);
		} else {
			console.error("Error creating user");
			console.table(newUser);
		}

		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			companyName: '',
			companyAddress: '',
			companyWebsite: '',
			agree: false,
		});
		console.log("Form data has been reset:");
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<ul>
				<li>
					<input
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
						className={styles.input}
						placeholder="First Name"
					/>
				</li>
				<li>
					<input
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
						className={styles.input}
						placeholder="Last Name"
					/>
				</li>
				<li>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className={styles.input}
						placeholder="Work Email"
					/>
				</li>
				<li>
					<input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className={styles.input}
						placeholder="Username"
					/>
				</li>
				<li>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className={styles.input}
						placeholder="Password"
					/>
				</li>
				<li>
					<input
						type="text"
						name="companyName"
						value={formData.companyName}
						onChange={handleChange}
						className={styles.input}
						placeholder="Company Name"
					/>
				</li>
				<li>
					<input
						type="text"
						name="companyAddress"
						value={formData.companyAddress}
						onChange={handleChange}
						className={styles.input}
						placeholder="Company Address"
					/>
				</li>
				<li>
					<input
						type="text"
						name="companyWebsite"
						value={formData.companyWebsite}
						onChange={handleChange}
						className={styles.input}
						placeholder="Company Website"
					/>
				</li>
			</ul>

  			<div className={styles.checkboxContainer}>
				<label className={styles.checkboxLabel}>
					<input
						type="checkbox"
						name="agree"
						checked={formData.agree}
						onChange={handleChange}
						className={styles.checkbox}
					/>
					I confirm that I am authorized to act on behalf of my company and agree to the <Link to="#" className={styles.link}>Terms of Service</Link> and <Link to="#" className={styles.link}>Privacy Policy</Link>.
				</label>
			</div>

			<button type="submit" className={styles.button}>Sign Up</button>
		</form>

  );
};

export default Signupform;
