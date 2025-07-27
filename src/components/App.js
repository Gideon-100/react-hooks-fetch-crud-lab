// ✅ Minor edit to trigger new Git commit
import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setShowQuestions(true); // ✅ Show updated list immediately
  }

  function handleDeleteQuestion(deletedId) {
    const updated = questions.filter((q) => q.id !== deletedId);
    setQuestions(updated);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updated = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <h1>Quiz Admin</h1>
      <section>
        <h2>New Question</h2>
        <QuestionForm onAddQuestion={handleAddQuestion} />
      </section>
      <button onClick={() => setShowQuestions(true)}>View Questions</button>
      {showQuestions && (
        <section>
          <h2>Questions</h2>
          <QuestionList
            questions={questions}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        </section>
      )}
    </main>
  );
}

export default App;

