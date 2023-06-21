import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";
import ResultModal from "../components/testpage/ResultModal";
import Cookies from "js-cookie";

// 문제 카드 컴포넌트를 정의. 각 문제를 보여주는 역할.
const QuestionCard = ({ questionData, showExplanation, showAnswer }) => {
  const optionChar = ["①", "②", "③", "④"];
  const correctAnswer = optionChar[questionData.correct - 1];

  return (
    <div>
      <h2>
        {questionData.question_num}. {questionData.question}
      </h2>
      {questionData.example &&
        questionData.example.map((item, index) => (
          <div key={index}>
            <p>{item.value}</p>
          </div>
        ))}
      {questionData.choice.map((item, index) => (
        <div key={index}>
          <p>
            {optionChar[index]} {item.value}
          </p>
        </div>
      ))}
      {showAnswer && <p>정답: {questionData.answer}</p>}
      {/* showAnswer가 true일 때만 정답을 보여줍니다. */}
      {showExplanation && <p>{questionData.solve}</p>}
      {/* showExplanation이 true일 때만 풀이를 보여줍니다. */}
    </div>
  );
};

// 답안 항목 컴포넌트를 정의. 각 답안 번호를 보여주는 역할
const AnswerItem = ({ numbers }) => {
  return (
    <AnswerItemStyle>
      {numbers.map((number, index) => (
        <React.Fragment key={index}>
          <AnswerNumber index={index}>{number}</AnswerNumber>
        </React.Fragment>
      ))}
    </AnswerItemStyle>
  );
};

// 답안 선택지 컴포넌트를 정의. 사용자가 선택할 수 있는 답안 선택지
const AnswerChoices = ({ numbers, selected, setSelected }) => {
  // 상태를 이 컴포넌트에서 직접 관리하지 않고 부모 컴포넌트에서 전달받은 상태와 상태 업데이트 함수를 사용
  const handleClick = (questionIndex, choiceIndex) => {
    const newSelected = [...selected];
    newSelected[questionIndex] = choiceIndex;
    setSelected(newSelected);

    console.log(newSelected);
  };

  return (
    <ChoiceContainer>
      {numbers.map((number, index) => (
        <div key={index}>
          {["①", "②", "③", "④"].map((choice, choiceIndex) => (
            <AnswerChoice
              key={choiceIndex}
              onClick={() => handleClick(index, choiceIndex)}
              selected={selected[index] === choiceIndex}
            >
              {choice}
            </AnswerChoice>
          ))}
        </div>
      ))}
    </ChoiceContainer>
  );
};

// 테스트 페이지 컴포넌트를 정의
function TestPage() {
  const [zoom, setZoom] = useState(100);
  const [viewStyle, setViewStyle] = useState("scroll"); // initial view style is 'scroll'
  const [testContent, setTestContent] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  console.log(accessToken);

  // 페이지가 로드되면 서버에서 문제 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          // 토큰이 없으면 로그인 페이지로 리디렉션
          navigate("/login");
        } else {
          const response = await api.get(
            `${process.env.REACT_APP_SERVER_URL}/api/question/exam/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data);
          setTestContent(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch the test content", error);
      }
    };

    fetchData();
  }, [id, accessToken, navigate]);

  // "오답노트 확인하기" 버튼을 누르면 실행되는 함수
  const handleCheckNote = () => {
    setShowAnswer(true);
    setShowExplanation(true); // set to true when "Check Note" button is clicked
    setIsModalVisible(false); // Close the modal
  };

  // 사용자가 '제출' 버튼을 누르면 서버에 답안을 제출
  const handleSubmit = () => {
    console.log(selected);

    const data = selected.map((answerIndex, questionIndex) => ({
      question_id: testContent[questionIndex].question_num,
      answer: (answerIndex + 1).toString(),
    }));

    // 제출할 데이터의 최종 형태
    const submitData = {
      exam_id: id, // useParams에서 가져온 id를 사용
      data: data,
    };

    // 서버에 제출할 답안 데이터를 만듭니다.
    api
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/submitAnswer`,
        submitData,
        { headers: { accesstoken: accessToken } }
      )
      .then((response) => {
        console.log(response.data);
        // 제출 결과 저장
        setSubmitResult(response.data);
        // 모달 보이기
        setIsModalVisible(true);
      })
      .catch((error) => {
        console.error("Failed to submit the answers", error);
        alert("답안 제출에 실패하였습니다.");
      });
  };

  return (
    <>
      <Toolbar>
        <div>
          Zoom:
          <button onClick={() => setZoom(80)}>80%</button>
          <button onClick={() => setZoom(100)}>100%</button>
          <button onClick={() => setZoom(150)}>150%</button>
          <div>Current Zoom: {zoom}%</div>
        </div>

        <div>
          View Style:
          <button onClick={() => setViewStyle("scroll")}>Scroll</button>
          <button onClick={() => setViewStyle("pagination")}>Pagination</button>
          <div>Current View Style: {viewStyle}</div>
        </div>

        <button>Bookmark</button>
        <button>Increase Text Size</button>
        <button>Exit</button>
      </Toolbar>

      <TestArea>
        <TestPageArea>
          {testContent ? (
            <div>
              {testContent.map((item, index) => (
                <QuestionCard
                  key={index}
                  questionData={item}
                  showExplanation={showExplanation}
                  showAnswer={showAnswer}
                />
              ))}
            </div>
          ) : (
            "Loading..."
          )}
        </TestPageArea>
      </TestArea>

      <AnswerArea>
        <AnswerHeader>
          <AnswerHeaderText>답안 표기란</AnswerHeaderText>
        </AnswerHeader>
        {testContent ? (
          <>
            <AnswerItem
              numbers={testContent.map((item) => item.question_num)}
            />
            <AnswerChoices
              numbers={testContent.map((item) => item.question_num)}
              selected={selected}
              setSelected={setSelected} // setSelected를 AnswerChoices에 전달
            />
          </>
        ) : (
          "Loading..."
        )}
      </AnswerArea>

      <BottomBar>
        <SubmitButton onClick={handleSubmit}>제출하기</SubmitButton>
      </BottomBar>
      {isModalVisible && (
        <ResultModal
          id={id}
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          result={submitResult}
          onCheckNote={handleCheckNote} // onCheckNote prop 추가
        />
      )}
    </>
  );
}

const Toolbar = styled.div`
  position: absolute;
  width: 1920px;
  height: 100px;
  left: 0px;
  top: 100px;
  background: #f8faff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestArea = styled.div`
  position: absolute;
  width: 1560px;
  height: 732px;
  left: 0px;
  top: 224px;
  background: #f8faff;
`;

const TestPageArea = styled.div`
  position: absolute;
  width: 1416px;
  height: 732px;
  left: 72px;
  top: 0px;
  background: #ffffff;
  overflow-y: auto;
`;

const AnswerArea = styled.div`
  position: absolute;
  width: 337px;
  height: 742px;
  left: 1584px;
  top: 214px;
  background: #f8faff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto; // in case the content exceeds the area height
`;

const AnswerHeader = styled.div`
  position: absolute;
  width: 337px;
  height: 60px;
  left: 0px;
  top: 0px;
  background: #282897;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnswerHeaderText = styled.div`
  position: absolute;
  width: auto;
  height: 30px;
  left: 121.5px; // to center it within the AnswerHeader
  top: 15px; // to center it within the AnswerHeader

  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.03em;

  color: #ffffff;
`;

const AnswerItemStyle = styled.div`
  position: absolute;
  width: 62px;
  height: 682px;
  left: 0px;
  top: 60px;

  background: rgba(40, 40, 151, 0.5);
  transform-origin: 0 0;
`;

const AnswerNumber = styled.span`
  position: absolute;
  width: 9px;
  height: 0px;
  left: 1px;
  top: ${(props) => props.index * 33.5 + 16}px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 150%;
  /* identical to box height, or 27px */

  display: flex;
  align-items: center;
  letter-spacing: 0.5em;

  color: #ffffff;
`;

const AnswerChoice = styled.span`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  font-family: "Plus Jakarta Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 150%;
  color: ${(props) => (props.selected ? "#00FF00" : "#282897")};
  cursor: pointer;
  margin-left: 15px;
  margin-bottom: 5px;
  margin-top: 0px;

  // 상자의 크기를 조정합니다.
  width: 27px; // 원하는 너비로 설정하세요.
  height: 28.5px; // 원하는 높이로 설정하세요.
`;

const BottomBar = styled.div`
  position: absolute;
  width: 1920px;
  height: 100px;
  left: 0px;
  top: 980px;
  background: #f8faff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 60px;
  margin-bottom: 1px;

  // & > div {
  //   margin-bottom: -30px; // Adjust this to change the gap between rows
  //   height: 62px;
  // }
`;

const SubmitButton = styled.button`
  position: absolute;
  width: 157px;
  height: 65px;
  left: 1691px;
  top: 18px;

  background: #282897;
  border-radius: 10px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #3f3f8f;
  }
`;

export default TestPage;
