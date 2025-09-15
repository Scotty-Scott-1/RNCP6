import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../security/authContext.jsx";
import styles from '../../Campaigns/Campaign.module.css';
import { getOneCampaign } from "./hooks/GetOneCampaign.jsx";

const EditCampaign = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { id } = useParams();

  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [mailingList, setMailingList] = useState("");
  const [emailSenderName, setEmailSenderName] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [landingPageTemplate, setLandingPageTemplate] = useState("");
  const [landingPage, setLandingPage] = useState(false);


  const [userMailingLists, setUserMailingLists] = useState([]);

  // load campaign
  const myCampaign = getOneCampaign(id, accessToken);


  const formatForInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  // load campaign data
  useEffect(() => {
    if (myCampaign) {
      setCampaignName(myCampaign.campaignName || "");
      setDescription(myCampaign.description || "");
      setStartTime(formatForInput(myCampaign.startTime));
      setEndTime(formatForInput(myCampaign.endTime));
      setMailingList(myCampaign.mailingList?._id || ""); // use ID for selection
      setEmailSenderName(myCampaign.emailSenderName || "");
      setEmailTemplate(myCampaign.emailTemplate || "");
      setLandingPageTemplate(myCampaign.landingPageTemplate || "");
      setLandingPage(myCampaign.landingPage || false);
    }
  }, [myCampaign]);


  useEffect(() => {
    const fetchMailingLists = async () => {
      try {
        const res = await fetch("https://localhost:5001/api/mailinglist/get", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUserMailingLists(data);
        }
      } catch (err) {
        console.error("Failed to fetch mailing lists:", err);
      }
    };
    if (accessToken) fetchMailingLists();
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaignName || !description || !startTime || !endTime || !mailingList || !emailSenderName) {
      alert("All required fields must be filled.");
      return;
    }

    try {
      const response = await fetch("https://localhost:5001/api/campaign/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          campaignName,
          description,
          startTime,
          endTime,
          mailingList,
          emailSenderName,
          emailTemplate,
          landingPageTemplate,
          landingPage,
        }),
      });

      if (response.ok) {
        console.log("Campaign updated");
        navigate("/campaigns");
      } else {
        alert("Failed to update campaign.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong updating the campaign.");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Edit Campaign</h1>

      <input
        type="text"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
        className={styles.input}
        placeholder="Campaign Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
        placeholder="Description"
        required
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className={styles.input}
        required
      />

      {/* === UPDATED: Mailing list dropdown */}
      <select
        value={mailingList}
        onChange={(e) => setMailingList(e.target.value)}
        className={styles.input}
        required
      >
        <option value="">-- Select Mailing List --</option>
        {userMailingLists.map((list) => (
          <option key={list._id} value={list._id}>{list.listName}</option>
        ))}
      </select>

      <input
        type="text"
        value={emailSenderName}
        onChange={(e) => setEmailSenderName(e.target.value)}
        className={styles.input}
        placeholder="Email Sender Name"
        required
      />
      <input
        type="text"
        value={emailTemplate}
        onChange={(e) => setEmailTemplate(e.target.value)}
        className={styles.input}
        placeholder="Email Template"
      />
      <input
        type="text"
        value={landingPageTemplate}
        onChange={(e) => setLandingPageTemplate(e.target.value)}
        className={styles.input}
        placeholder="Landing Page Template"
      />

      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={landingPage}
          onChange={(e) => setLandingPage(e.target.checked)}
        />
        Create a landing page for this campaign
      </label>

      <button type="submit" className={styles.button2}>
        Save Changes
      </button>
    </form>
  );
};

export default EditCampaign;
