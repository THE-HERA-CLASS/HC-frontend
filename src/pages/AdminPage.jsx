import React, { useState } from 'react';

const AdminPage = () => {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const lines = input.split('\n');
    const newQuestions = [];
    let question = null;
    let alert = null;
    let isView = false; // view가 시작되었는지를 나타내는 상태 변수
    let groupTitle = null; // group title 정보를 저장하는 변수

    lines.forEach((line, index) => {
      const numberMatch = line.match(/^(\d+)\./); // 문제 번호를 찾는 정규 표현식
      const choiceMatch = line.match(/^①|②|③|④/); // 선택지를 찾는 정규 표현식
      const questionEndMatch = line.match(/[?)]\s*$/); // 문제의 끝을 찾는 정규 표현식
      const alertMatch = line.match(/【.*】/); // 알림 정보를 찾는 정규 표현식

      if (alertMatch) {
        alert = line; // alertMatch가 참이면 alert에 line을 할당
        isView = false; // alertMatch가 참이면 isView를 false로 설정
      } else if (numberMatch) {
        if (question) {
          newQuestions.push(question);
        }

        question = {
          number: numberMatch[1],
          text: line.replace(/^\d+\.\s*/, ''),
          choices: [],
          view: [],
          alert,
        };

        alert = null;
        isView = true; // 문제 번호가  나타나면 이후 내용은 모두 view에 추가
      } else if (choiceMatch) {
        question.choices.push(line);
        isView = false; // 선택지가 나타나면 이후 내용은 모두 view에 추가하지 않음
      } else if (isView) {
        question.view.push(line); // isView가 참이면 view에 line을 추가
      }
    });

    if (question) {
      newQuestions.push(question);
    }

    setQuestions(newQuestions);
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={handleInputChange} />
        <button type="submit">문제 추가</button>
      </form>

      {/* {questions.map((question) => (
        <div key={question.number}>
          <h1>문제 {question.number}</h1>
          <p>{question.text}</p>
          <div style={viewStyle}>
          {question.view.map((view, index) => (
            <div key={index}>{view}</div>
          ))}
          </div>
          {question.choices.map((choice, index) => (
            <div key={index}>{choice}</div>
          ))}
        </div>
      ))} */}
      <textarea 
        readOnly
        value={
          questions.map((question) => 
          `${question.alert ? question.alert + '\n' : ''}문제 ${question.number}\n${question.text}\n${question.view.join('\n')}\n${question.choices.join('\n')}\n`
        ).join('\n')}
      />
    </div>
  );
};

//textareaStart 공부 필

const viewStyle = {};

export default AdminPage;