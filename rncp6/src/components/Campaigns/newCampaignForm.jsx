import React, { useState, useEffect } from 'react';
import styles from './DashComp1.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../security/authContext.jsx";
import DateTimePicker from '../DateInput/DateInputComponent.jsx';

const NewCampaignComponent = () => {
	/*STOP RELOADING: Stop the form from reloading the page*/
	const navigate = useNavigate();
	/*STATE VARIABLES: Create state variables for each input field*/
	const [campaignName, setCampaignName] = useState("");
	const [description, setDescription] = useState("");
	const [selectMailingList, setSelectMailingList] = useState("");
	const [emailSenderName, setEmailSenderName] = useState("");
	const [emailTemplate, setEmailTemplate] = useState("");
	const [landingPageTemplate, setLandingPageTemplate] = useState("");
	const [landingPage, setLandingPage] = useState(false);
	const { accessToken } = useAuth();
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());

	/*HANDLE FORM SUBMISSION: Handle the form submission event*/
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!campaignName || !description ||
			!startTime || !endTime || !selectMailingList ||
			!emailSenderName) {
			alert("Please fill in all fields and agree to the terms.");
			return;
		}
		console.log("sdfdfdgfdgdf",{accessToken})
		try {
			const response = await fetch("https://localhost:5001/api/campaign/new", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					campaignName,
					description,
					startTime: startTime.toISOString(),
					endTime: endTime.toISOString(),
					selectMailingList,
					emailSenderName,
					emailTemplate,
					landingPageTemplate,
					landingPage,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				console.log("Campaign created successfully:", data);
				navigate("/campaigns");
			} else {
				const errorData = await response.json();
				console.error("Error creating campaign:", errorData);
				alert("Failed to create campaign. Please try again.");
			}
		} catch (error) {
			console.error("Error creating campaign:", error);
			alert("An error occurred. Please try again.");
		}
	}

	return (
		<form className={styles.container} onSubmit={handleSubmit}>
			<input
				type="text"
				value={campaignName} onChange={(e) => setCampaignName(e.target.value)}
				className={styles.input}
				placeholder="Campaign Name"
			/>
			<input
				type="text"
				value={description} onChange={(e) => setDescription(e.target.value)}
				className={styles.input}
				placeholder="Description"
			/>
<label htmlFor="startTime">Start Time:</label>
<DateTimePicker
  id="startTime"
  value={startTime}
  onChange={setStartTime}
   className={styles.inputDatetime}

/>

<label htmlFor="endTime">End Time:</label>
<DateTimePicker
  id="endTime"
  value={endTime}
  onChange={setEndTime}
    className={styles.inputDatetime}
/>
			<input
				type="text"
				value={selectMailingList} onChange={(e) => setSelectMailingList(e.target.value)}
				className={styles.input}
				placeholder="Select Mailing List"
			/>
			<input
				type="text"
				value={emailSenderName} onChange={(e) => setEmailSenderName(e.target.value)}
				className={styles.input}
				placeholder="Email Sender Name"
			/>
			<input
				type="text"
				value={emailTemplate} onChange={(e) => setEmailTemplate(e.target.value)}
				className={styles.input}
				placeholder="Email Template"
			/>
			<input
				type="text"
				value={landingPageTemplate} onChange={(e) => setLandingPageTemplate(e.target.value)}
				className={styles.input}
				placeholder="Landing Page Template"
			/>
			<label className={styles.checkboxContainer}>
				<input
					type="checkbox"
					checked={landingPage} onChange={(e) => setLandingPage(e.target.checked)}
				/>
				Create a landing page for this campaign
			</label>

			<button type="submit" className={styles.button2}>Submit</button>

		</form>
	);

}
export default NewCampaignComponent;
