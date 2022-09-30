import { createContext, useState } from "react";
import FeedbackData from "../data/FeedBackData";
import { v4 as uuidv4 } from "uuid";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (itemId) => {
    const removedFeedback = feedback.filter((item) => item.id !== itemId);
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(removedFeedback);
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  //Set item to be updated

  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });

    // console.log(feedbackEdit);
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
