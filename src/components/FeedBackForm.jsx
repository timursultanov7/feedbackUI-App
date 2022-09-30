import { useState, useContext, useEffect } from "react";

import Button from "./shared/Button";
import Card from "./shared/Card";
import RatingSelect from "./RatingSelect";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackForm = () => {
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    if (text === "") {
      setBtnDisabled(true);
      setMsg(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMsg("Text must be at least 10 charchters");
      setBtnDisabled(true);
    } else {
      setMsg(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
    }
  };

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  return (
    <div>
      <Card>
        <form onSubmit={handleSubmit}>
          <h2>How would you rate with us?</h2>

          <RatingSelect
            select={(rating) => {
              // console.log(rating);
              return setRating(rating);
            }}
          />

          <div className="input-group">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Write a review "
              value={text}
            />
            <Button type="submit" isDisabled={btnDisabled}>
              Send
            </Button>
          </div>

          {msg && <div className="message">{msg}</div>}
        </form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
