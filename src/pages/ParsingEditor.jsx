import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // 추가된 부분
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { majorGet, certificateGet, subjectGet } from '../api/certificate';

const ParsingEditor = () => {
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [select1, setSelect1] = useState('');
  const [select2, setSelect2] = useState('');
  const [select3, setSelect3] = useState('');
  const [majors, setMajors] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchMajors = async () => {
      const response = await majorGet();
      setMajors(response);
    };

    const fetchCertificates = async () => {
      const response = await certificateGet();
      setCertificates(response);
    };

    const fetchSubjects = async () => {
      const response = await subjectGet();
      setSubjects(response);
    };

    fetchMajors();
    fetchCertificates();
    fetchSubjects();
  }, []);

  const handleMajorChange = (e) => {
    setSelect1(e.target.value);
  };

  const handleCertificateChange = (e) => {
    setSelect2(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSelect3(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionsData = {
      major_id: select1,
      certificate_id: select2,
      subject_id: select3,
      contents: questions, // 혹은 contents: input, 입력된 문자열을 그대로 전송하려면 이와 같이 작성
    };

    try {
      const res = await axios.post('/api/submit', questionsData);
      // 서버로부터의 응답 처리
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }

    setInput('');
  };

  useEffect(() => {
    console.log(questions); // questions 상태의 변화를 추적
  }, [questions]);

  const handleInputChange = (newInput) => {
    console.log('New input: ', newInput);
    setInput(newInput);

    const lines = newInput.split('\n');
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
          text: line.replace(/^\s*\d+\.\s*/, ''),
          choices: [],
          answer: null,
          explanation: '',
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
        question.choices[question.choices.length - 1] += '\n' + line.trim();
      } else if (isExplanation) {
        question.explanation += line + '\n';
      }
    });

    if (question) {
      newQuestions.push(question);
    }
    console.log('New questions: ', newQuestions); // 생성된 새로운 질문 목록 출력
    setQuestions(newQuestions);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image'];

  return (
    <div>
      <h2 style={subHeaderStyle}>문제 관리</h2>
      <form onSubmit={handleSubmit}>
        <Select1 value={select1} onChange={(e) => setSelect1(e.target.value)}>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </Select1>
        <Select2 value={select2} onChange={(e) => setSelect2(e.target.value)}>
          {certificates.map((certificate) => (
            <option key={certificate.id} value={certificate.id}>
              {certificate.name}
            </option>
          ))}
        </Select2>
        <Select3 value={select3} onChange={(e) => setSelect3(e.target.value)}>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Select3>
        <TextAreaInput value={input} onChange={handleInputChange}>
          <StyledQuill
            theme='snow'
            value={input}
            onChange={(content, delta, source, editor) => {
              const text = editor.getText();
              handleInputChange(text);
            }} // 수정된 부분
            modules={modules}
            formats={formats}
            style={{ height: '696px' }}
          />
        </TextAreaInput>
        <ExtraBox>
          <TempSaveButton>임시저장</TempSaveButton>
          <RegisterButton>문제등록</RegisterButton>
        </ExtraBox>
      </form>
      <TextAreaOutput
        readOnly
        value={
          questions.length
            ? questions
                .map((question) => {
                  console.log('Question: ', question); // 질문 항목 출력
                  const { number, text, choices, answer, explanation } = question;
                  return `번호: ${number}\n문제: ${text}\n보기: ${choices.join(
                    '\n',
                  )}\n문제해설: ${explanation}\n정답: ${answer}`;
                })
                .join('\n')
            : ''
        }
      />
    </div>
  );
};

const subHeaderStyle = {
  position: 'absolute',
  width: '95px',
  height: '38px',
  left: '72px',
  top: '135px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '25px',
  lineHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '-0.03em',
  color: '#000000',
  whiteSpace: 'nowrap',
};

const Select1 = styled.select`
  position: absolute;
  width: 284px;
  height: 50px;
  left: 72px;
  top: 209px;
  background: #d3dce7;
  border-radius: 10px;
`;

const Select2 = styled(Select1)`
  left: 368px;
`;

const Select3 = styled(Select1)`
  left: 664px;
`;

const TextAreaInput = styled.div`
  position: absolute;
  width: 876px;
  height: 734px;
  left: 72px;
  top: 269px;
  background: #d3dce7;
  border-radius: 10px;
  resize: none;
  .quill {
    // ReactQuill 컴포넌트 스타일링
    height: 100%;
  }
`;

const ExtraBox = styled.div`
  position: absolute;
  width: 874px;
  height: 72px;
  left: 73px;
  top: 935px;
  background: #bbc3cd;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; // 버튼 간의 간격
`;

const TextAreaOutput = styled.textarea`
  position: absolute;
  width: 876px;
  height: 796px;
  left: 972px;
  top: 207px;
  background: #d3dce7;
  border-radius: 10px;
  resize: none;
`;

const TempSaveButton = styled.button`
  box-sizing: border-box;
  width: 160px;
  height: 50px;
  border: 2px solid #282897;
  border-radius: 10px;
  background: transparent; // ExtraBox의 배경색이 보이도록 설정
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.03em;
  color: #282897;
`;

const RegisterButton = styled.button`
  width: 160px;
  height: 50px;
  background: #282897;
  border-radius: 10px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.03em;
  color: #d3dce7;
`;

const StyledQuill = styled(ReactQuill)`
  .ql-container.ql-snow {
    border-radius: 10px; // 추가된 부분
    border: 1px solid #ccc;
  }
  .ql-toolbar.ql-snow {
    border-radius: 10px 10px 0 0; // 추가된 부분
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    padding: 8px;
  }
  .ql-editor {
    border-radius: 0 0 10px 10px; // 추가된 부분
  }
`;

export default ParsingEditor;
