import React from "react";

function QuestionList({ questions, onDelete, onUpdate }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleUpdate(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: parseInt(newCorrectIndex) }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion));
  }

  const renderQuestions = questions.map((q) => (
    <li key={q.id}>
      <h4>{q.prompt}</h4>
      <label>
        Correct Answer:
        <select
          value={q.correctIndex}
          onChange={(e) => handleUpdate(q.id, e.target.value)}
        >
          {q.answers.map((ans, index) => (
            <option key={index} value={index}>
              {ans}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => handleDelete(q.id)}>Delete Question</button>
    </li>
  ));

  return <ul>{renderQuestions}</ul>;
}

export default QuestionList;

