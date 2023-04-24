import React from "react";

function QuestionItem({ question }) {
   const { id, prompt, answers, correctIndex } = question;

   const options = answers.map((answer, index) => (
      <option key={index} value={index}>
         {answer}
      </option>
   ));

   const handleDelete = (id) => {
      fetch(`http://localhost:4000/questions/${id}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
         },
      });
   };

   const handleChange = (id, e) => {
      fetch(`http://localhost:4000/questions/${id}`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            correctIndex: parseInt(e.target.value),
         }),
      });
   };

   return (
      <li>
         <h4>Question {id}</h4>
         <h5>Prompt: {prompt}</h5>
         <label>
            Correct Answer:
            <select
               defaultValue={correctIndex}
               onChange={(e) => {
                  handleChange(id, e);
               }}
            >
               {options}
            </select>
         </label>
         <button onClick={() => handleDelete(id)}>Delete Question</button>
      </li>
   );
}

export default QuestionItem;
