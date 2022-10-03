import { createContext, useState, useEffect } from "react";
// import FeedbackData from "../data/FeedBackData";
// import { v4 as uuidv4 } from "uuid";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  // const [feedback, setFeedback] = useState(FeedbackData);
  const [feedback, setFeedback] = useState([]);

  /// Delete feedback using DELETE Method
  const deleteFeedback = async (itemId) => {
    const removedFeedback = feedback.filter((item) => item.id !== itemId);
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${itemId}`, { method: "DELETE" });
      setFeedback(removedFeedback);
    }
  };

  // POST method - putting data into the DB
  const addFeedback = async (newFeedback) => {
    // newFeedback.id = uuidv4();
    const response = await fetch(`/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  //Set item to be updated

  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });

    // console.log(feedbackEdit);
  };

  //Update method:
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updItem),
    });

    const data = response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback`);

    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeedback();
  }, [feedback]);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
