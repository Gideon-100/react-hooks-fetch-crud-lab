

import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    onDeleteQuestion(id);
  }

  function handleCorrectAnswerChange(e) {
    const newCorrectIndex = parseInt(e.target.value, 10);

    // ✅ PATCH to persist the change
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then(() => {
        // Tell parent to update local state too
        onUpdateAnswer(id, newCorrectIndex);
      });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
