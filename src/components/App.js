import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
  }, [])

  function handleQuestionsAnswered(correct) {
    if (page === "Form") {
      setPage("List")
    }
  }

  function addQuestion(newQuestion) {
    setQuestions((questions) => [...questions, newQuestion])
  }

  function removeQuestion(id) {
    setQuestions((questions) => questions.filter((q) => q.id !== id))
  }

  function updateQuestion(id, updateData) {
    setQuestions((questions) => 
      questions.map((q) => 
        q.id === id ? { ...q, ...updateData } : q)
    )
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm  onQuestionAdded = {addQuestion}/>)
         : (<QuestionList 
              questions={questions}
              onDelete={removeQuestion}
              onUpdate={updateQuestion}
            />)}
    </main>
  );
}

export default App;
