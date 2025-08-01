import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer0: "",
    answer1: "",
    answer2: "",
    answer3: "",
    correctIndex: "0",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer0,
        formData.answer1,
        formData.answer2,
        formData.answer3,
      ],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => onAddQuestion(data));

    setFormData({
      prompt: "",
      answer0: "",
      answer1: "",
      answer2: "",
      answer3: "",
      correctIndex: "0",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 1:
        <input
          type="text"
          name="answer0"
          value={formData.answer0}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 2:
        <input
          type="text"
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 3:
        <input
          type="text"
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 4:
        <input
          type="text"
          name="answer3"
          value={formData.answer3}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="correct-answer-select">Correct Answer (Form):</label>
      <select
        id="correct-answer-select"
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        <option value="0">Answer 1</option>
        <option value="1">Answer 2</option>
        <option value="2">Answer 3</option>
        <option value="3">Answer 4</option>
      </select>
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default QuestionForm;


