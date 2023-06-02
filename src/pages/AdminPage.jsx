import React, { useState } from "react";
import styled from 'styled-components';

const AdminPage = () => {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [select1, setSelect1] = useState("");
  const [select2, setSelect2] = useState("");
  const [select3, setSelect3] = useState("");

  const handleInputChange = (event) => {
    const newInput = event.target.value;
    setInput(newInput);

    const lines = newInput.split("\n");
    const newQuestions = [];
    let question = null;
    let isChoice = false;
    let isExplanation = false;

    lines.forEach((line) => {
      const numberMatch = line.match(/^\s*(\d+)\./); // 문제 번호를 찾는 정규 표현식
      const choiceMatch = line.match(/^\s*(①|②|③|④)/); // 선택지를 찾는 정규 표현식
      const answerMatch = line.match(/^--정답\s*(\d+)/); // 정답 정보를 찾는 정규 표현식
      const explanationStartMatch = line.match(/^<문제 해설>/); // 해설 시작을 찾는 정규 표현식
      const explanationEndMatch = line.match(/\s*\[해설작성자\s*:\s*.+\]\s*$/); // 해설 끝을 찾는 정규 표현식

      if (numberMatch) {
        if (question) {
          newQuestions.push(question);
        }

        question = {
          number: numberMatch[1],
          text: line.replace(/^\s*\d+\.\s*/, ""),
          choices: [],
          answer: null,
          explanation: "",
        };

        isChoice = true;
        isExplanation = false;
      } else if (choiceMatch && isChoice) {
        question.choices.push(line.trim());
      } else if (answerMatch) {
        question.answer = answerMatch[1];
      } else if (explanationStartMatch) {
        isChoice = false;
        isExplanation = true;
      } else if (explanationEndMatch && isExplanation) {
        question.explanation += line;
        isExplanation = false;
      } else if (isChoice) {
        question.choices[question.choices.length - 1] += "\n" + line.trim();
      } else if (isExplanation) {
        question.explanation += line + "\n";
      }
    });

    if (question) {
      newQuestions.push(question);
    }

    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput("");
  };

  return (
    <div>
      <h2 style={subHeaderStyle}>문제 관리</h2>
      <form onSubmit={handleSubmit}>
        <Select1 value={select1} onChange={(e) => setSelect1(e.target.value)}>
          {/* Select Options */}
        </Select1>
        <Select2 value={select2} onChange={(e) => setSelect2(e.target.value)}>
          {/* Select Options */}
        </Select2>
        <Select3 value={select3} onChange={(e) => setSelect3(e.target.value)}>
          {/* Select Options */}
        </Select3>
        <TextAreaInput value={input} onChange={handleInputChange} />
      </form>
      <TextAreaOutput
        readOnly
        value={
          questions.length
            ? questions
                .map((question) => {
                  const { number, text, choices, answer, explanation } =
                    question;
                  return `번호: ${number}\n문제: ${text}\n보기: ${choices.join(
                    "\n"
                  )}\n문제해설: ${explanation}\n정답: ${answer}`;
                })
                .join("\n")
            : ""
        }
      />
    </div>
  );
};

const subHeaderStyle = {
  position: "absolute",
  width: "95px",
  height: "38px",
  left: "72px",
  top: "135px",
  fontFamily: "Inter, sans-serif",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "25px",
  lineHeight: "38px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "-0.03em",
  color: "#000000",
  whiteSpace: "nowrap",
};

const Select1 = styled.select`
  position: absolute;
  width: 284px;
  height: 50px;
  left: 72px;
  top: 209px;
  background: #D3DCE7;
  border-radius: 10px;
`;

const Select2 = styled(Select1)`
  left: 368px;
`;

const Select3 = styled(Select1)`
  left: 664px;
`;

const TextAreaInput = styled.textarea`
  position: absolute;
  width: 876px;
  height: 734px;
  left: 72px;
  top: 269px;
  background: #D3DCE7;
  border-radius: 10px;
  resize: none;
`;

const TextAreaOutput = styled.textarea`
  position: absolute;
  width: 876px;
  height: 796px;
  left: 972px;
  top: 207px;
  background: #D3DCE7;
  border-radius: 10px;
  resize: none;
`;

export default AdminPage;
