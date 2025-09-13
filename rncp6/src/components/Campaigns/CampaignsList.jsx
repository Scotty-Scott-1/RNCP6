import React, { useState } from "react";
import styles from "./DashComp1.module.css";
import { useNavigate, Link } from 'react-router-dom';


const Campaigns = () => {
  const navigate = useNavigate();
  const campaigns = [
    { id: 1, name: "Spring Awareness", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 2, name: "Phishing Test 1", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 3, name: "Red Team Drill", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 4, name: "Employee Training", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 5, name: "Simulated Attack", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 6, name: "Quarterly Test", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 7, name: "Phishing Test 2", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
    { id: 8, name: "Summer Awareness", dateCreated: "01/05/2014", status: "Active", type: "Phishing" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = campaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const handleCampaignClick = (id) => {
    console.log("Clicked campaign:", id);
  };

  const handleAddCampaign = () => {
    console.log("Add new campaign");
    navigate("/campaign/new");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Campaigns</h1>
      </div>


      {/* Table-like header row */}
      <div className={styles.listHeader}>
        <span>Name</span>
        <span>Date Created</span>
        <span>Status</span>
        <span>Type</span>
        <span>Actions</span>
      </div>

      {/* Campaign entries */}
      <div className={styles.list}>
        {currentItems.map((c) => (
          <div key={c.id} className={styles.listItem}>
            <button
              className={styles.campaignButton}
              onClick={() => handleCampaignClick(c.id)}
            >
              {c.name}
            </button>
            <span>{c.dateCreated}</span>
            <span>{c.status}</span>
            <span>{c.type}</span>
            <button className={styles.button} onClick={handleAddCampaign}>
              +
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Campaigns;
