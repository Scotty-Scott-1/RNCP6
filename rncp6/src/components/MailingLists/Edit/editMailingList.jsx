import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import styles from '../../MailingLists/MailingLists.module.css';
import { useAuth } from "../../../security/authContext.jsx";
import { getOneMailingList } from "./hooks/GetOneList.jsx";

const EditMailingList = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const myList = getOneMailingList(id, accessToken);

  useEffect(() => {
    if (myList) {
      setListName(myList.listName || "");
      setDescription(myList.description || "");
    }
  }, [myList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listName || !description) {
      alert("Attrs should not be empty.");
      return;
    }

    try {
      const response = await fetch("https://localhost:5001/api/mailinglist/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, listName, description })
      });

      if (response.ok) {
        console.log(response.body);
      }
      navigate(`/mailinglists`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong updating the list.");
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Edit Mailing List</h1>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        className={styles.input}
        placeholder="Mailing List Name"
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

      <button type="submit" className={styles.button2}>
        Save Changes
      </button>
    </form>
  );
};

export default EditMailingList;
