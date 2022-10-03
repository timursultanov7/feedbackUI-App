import { useContext } from "react";
import FeedBackItem from "./FeedBackItem";
import { motion, AnimatePresence } from "framer-motion";
import { FeedbackContext } from "../context/FeedbackContext";
import Spinner from "./shared/Spinner";

const FeedbackList = () => {
  const { feedback, isLoading } = useContext(FeedbackContext);

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet </p>;
  }

  return isLoading ? (
    <h3>
      <Spinner />
    </h3>
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedBackItem item={item} key={item.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackList;
