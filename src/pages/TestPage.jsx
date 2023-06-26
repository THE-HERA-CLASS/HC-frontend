import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios/api";
import ResultModal from "../components/testpage/ResultModal";
import Cookies from "js-cookie";
import checkO from "../Img/TestPage/check-O.png";
import checkX from "../Img/TestPage/check-X.png";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { ReactComponent as ExitIcon } from "../Img/TestPage/ExitIcon.svg";
import CustomBtn from "../components/common/CustomBtn";
import CustomText from "../components/common/CustomText";

// 문제 카드 컴포넌트를 정의. 각 문제를 보여주는 역할.
const QuestionCard = ({
  questionData,
  showExplanation,
  showAnswer,
  markingImage,
  selected,
  setSelected,
  questionIndex,
}) => {
  const optionChar = ["①", "②", "③", "④"];
  const correctAnswer = optionChar[questionData.correct - 1];
  const [selectedChoice, setSelectedChoice] = React.useState(null);
  const ref = React.useRef(null);

  const handleChoiceClick = (choiceIndex) => {
    console.log("Choice clicked: ", choiceIndex);
    const newSelected = [...selected];
    newSelected[questionIndex] = choiceIndex;
    setSelected(newSelected);
  };

  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "img") {
      return (
        <>
          <br />
          {convertNodeToElement(node, index)}
        </>
      ); // '<br />' 태그를 이미지 앞에 추가
    }
  };

  return (
    <QuestionCardWrapper ref={ref}>
      {showAnswer && (
        <MarkingImage
          src={markingImage}
          alt="Marking Result"
          style={{ top: "-40px", left: "-40px" }}
        />
      )}
      <p>
        <strong>
          {questionData.question_num}.{" "}
          {ReactHtmlParser(questionData.question, { transform })}{" "}
        </strong>
      </p>
      {questionData.example &&
        questionData.example.map((item, index) => (
          <ExampleBox key={index}>
            {item.value.split("\n").map((line, i) => (
              <p key={i}>{ReactHtmlParser(line, { transform })}</p>
            ))}
          </ExampleBox>
        ))}
      {questionData.choice.map((item, index) => (
        <Choice
          key={index}
          onClick={() => handleChoiceClick(index)}
          selected={selected[questionIndex] === index}
        >
          <p>
            {optionChar[index]} {item.value}
          </p>
        </Choice>
      ))}
      {showAnswer && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          정답: {questionData.answer}
        </p>
      )}
      {/* showAnswer가 true일 때만 정답을 보여줌. */}
      {showExplanation && (
        <SolveText>
          <p style={{ color: "blue" }}>해설</p>
          {questionData.solve.split("\n").map((line, i) => (
            <p key={i} style={{ color: "blue" }}>
              {ReactHtmlParser(line, { transform })}
            </p>
          ))}
        </SolveText>
      )}
      {/* showExplanation이 true일 때만 풀이를 보여줌. */}
    </QuestionCardWrapper>
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
  const [testContent, setTestContent] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [markingImages, setMarkingImages] = useState([]);
  const leftColumnRef = React.useRef();
  const rightColumnRef = React.useRef();
  const pageRef = React.useRef();

  const { id } = useParams();

  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const [time, setTime] = useState(30 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleExit = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log("submitResult has been updated", submitResult);
  }, [submitResult]);

  // 페이지가 로드되면 서버에서 문제 데이터 가져오기
  useEffect(() => {
    console.log("useEffect was called");
    const fetchData = async () => {
      try {
        if (!accessToken) {
          // 토큰이 없으면 로그인 페이지로 리디렉션
          navigate("/logins");
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
          setTestContent(response.data.data); // 문제 데이터를 설정
          setSelected(new Array(response.data.data.length).fill(null)); // 문제 수와 같은 크기의 배열을 생성하고 모든 원소를 null로 초기화
        }
      } catch (error) {
        console.error("Failed to fetch the test content", error);
      }
    };

    fetchData();
  }, [id, accessToken, navigate]);

  // "오답노트 확인하기" 버튼을 누르면 실행되는 함수
  const handleCheckNote = async () => {
    try {
      const response = await api.get(`/api/getAnswerWithExamId/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data.data;
      console.log(data);

      setShowAnswer(true);
      setShowExplanation(true);
      setIsModalVisible(false);

      const markingImages = [];

      // marking 값을 확인하여 이미지 렌더링
      for (let i = 0; i < data.length; i++) {
        console.log(`Marking value for question ${i}: ${data[i].marking}`); // 출력 추가
        if (data[i].marking) {
          markingImages.push(checkO);
        } else {
          markingImages.push(checkX);
        }
      }

      setMarkingImages(markingImages);
    } catch (error) {
      console.error("Failed to get the marking data", error);
    }
  };

  // 사용자가 '제출' 버튼을 누르면 서버에 답안을 제출
  const handleSubmit = () => {
    console.log("handleSubmit function is called");
    console.log(selected);

    // 선택한 답안 중 null 값이 있는지 확인
    if (selected.some((choice) => choice === null)) {
      alert("아직 풀지 않은 문제가 있습니다!");
      return; // 함수를 더 이상 진행하지 않고 종료
    }

    const data = selected.map((answerIndex, questionIndex) => ({
      question_id: testContent[questionIndex].question_id,
      answer: (answerIndex + 1).toString(),
    }));

    // 제출할 데이터의 최종 형태
    const submitData = {
      exam_id: id, // useParams에서 가져온 id를 사용
      data: data,
    };

    // 서버에 제출할 답안 데이터를 전송
    api
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/submitAnswer`,
        submitData,
        { headers: { accesstoken: accessToken } }
      )
      .then((response) => {
        console.log("Submit response: ", response);
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
          <StyledButton onClick={handleExit}>
            <StyledExitIcon />
            <ButtonText>나가기</ButtonText>
          </StyledButton>
        </div>
        <TimerWrapper>
          <TimeDisplay>
          <strong><p>제한시간: 30:00</p></strong>
          <ButtonText1>남은시간: {formatTime(time)}</ButtonText1>
          </TimeDisplay>
          <CustomBtn
            width="82px"
            height="38px"
            bc="#282897"
            _borderradius="4px"
            onClick={!isActive ? startTimer : pauseTimer}
          >
            <CustomText
              fontSize="15px"
              fontWeight="500"
              fontFamily="Inter"
              color="#fff"
            >
              {!isActive ? "Start" : "Pause"}
            </CustomText>
          </CustomBtn>
        </TimerWrapper>
      </Toolbar>

      <TestArea>
        <TestPageArea ref={pageRef}>
          {testContent ? (
            <div style={{ display: "flex", position: "relative" }}>
              <Column ref={leftColumnRef}>
                {testContent
                  .slice(0, Math.ceil(testContent.length / 2))
                  .map((item, index) => (
                    <QuestionCard
                      key={index}
                      questionData={item}
                      showExplanation={showExplanation}
                      showAnswer={showAnswer}
                      markingImage={markingImages[index]}
                      selected={selected}
                      setSelected={setSelected}
                      questionIndex={index}
                    />
                  ))}
              </Column>
              <Column ref={rightColumnRef}>
                {testContent
                  .slice(Math.ceil(testContent.length / 2))
                  .map((item, index) => (
                    <QuestionCard
                      key={index}
                      questionData={item}
                      showExplanation={showExplanation}
                      showAnswer={showAnswer}
                      markingImage={
                        markingImages[Math.ceil(testContent.length / 2) + index]
                      }
                      selected={selected}
                      setSelected={setSelected}
                      questionIndex={Math.ceil(testContent.length / 2) + index}
                    />
                  ))}
              </Column>
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

const QuestionCardWrapper = styled.div`
  position: relative;
`;

const MarkingImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const SolveText = styled.p`
  margin-bottom: 35px;
`;

const Toolbar = styled.div`
  position: absolute;
  width: 1920px;
  height: 100px;
  left: 0px;
  top: 100px;
  background: #f8faff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 72px;
`;

const TimerWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-right: 200px;
`;

const TimeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: -20px;
`;

const StyledExitIcon = styled(ExitIcon)`
  width: 36px;
  height: 36px;
  transform: rotate(-0deg);
  flex-shrink: 0;
  border: none;
  background: transparent;
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonText = styled.span`
  margin-top: 5px; // Adjust this to bring the text closer
  font-weight: bold;
`;

const ButtonText1 = styled.span`
  margin-top: -12px; // Adjust this to bring the text closer
  font-weight: bold;
`;

const ExampleBox = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
`;

const Choice = styled.div`
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
`;

const TestArea = styled.div`
  display: flex;
  position: absolute;
  width: 1560px;
  height: 732px;
  left: 0px;
  top: 224px;
  background: #f8faff;
  align-items: stretch;
`;

const Column = styled.div`
  flex: 1;
  position: relative;
  margin-right: 50px; // 필요하다면 오른쪽 마진을 추가
  margin-left: 50px;
  margin-top: 50px;
  height: 100%;
  &:first-child {
    padding-right: 50px;
  }
  &:last-child {
    margin-right: 50; // 마지막 column은 오른쪽 마진 없음
  }
`;

const TestPageArea = styled.div`
  position: absolute;
  width: 1416px;
  height: 732px; // TestPageArea의 높이를 명시적으로 설정합니다.
  left: 72px;
  top: 0px;
  background: #ffffff;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  overflow: auto;
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
  left: 121.5px;
  top: 15px;

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
  left: 27px;
  top: ${(props) => props.index * 33.5 + 16}px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 27px;
  line-height: 150%;
  /* identical to box height, or 27px */

  display: flex;
  align-items: center;
  letter-spacing: 0em;
  justify-content: center;

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
  color: ${(props) => (props.selected ? "red" : "#282897")};
  cursor: pointer;
  margin-left: 15px;
  margin-bottom: 5px;
  margin-top: 0px;

  width: 27px;
  height: 28.5px;
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
  //   margin-bottom: -30px;
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
