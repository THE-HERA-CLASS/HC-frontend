import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

function TestPage() {
  const [zoom, setZoom] = useState(100);
  const [viewStyle, setViewStyle] = useState("scroll"); // initial view style is 'scroll'
  const [testContent, setTestContent] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/question/exam/${id}`
        );
        setTestContent(response.data);
      } catch (error) {
        console.error("Failed to fetch the test content", error);
      }
    };

    fetchData();
  }, [id]);

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
            <>
              <h2>문제 {testContent.question_num}</h2>
              <p>{testContent.question}</p>
            </>
          ) : (
            "Loading..."
          )}
        </TestPageArea>
      </TestArea>

      <AnswerArea>
        <AnswerHeader>
          <AnswerHeaderText>답안 표기란</AnswerHeaderText>
        </AnswerHeader>
        <AnswerItem>{/* Here will be the number of the question */}</AnswerItem>
        {/* Here will be the answer notation */}
      </AnswerArea>

      <BottomBar>
        {/* Here will be the list of unanswered questions and the submission button */}
      </BottomBar>
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
`;

const AnswerArea = styled.div`
  position: absolute;
  width: 337px;
  height: 742px;
  left: 1584px;
  top: 214px;
  background: grey;
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

const AnswerItem = styled.div`
  position: absolute;
  width: 682px;
  height: 62px;
  left: 62px;
  top: 60px; // adjust this value to move the element left

  background: rgba(40, 40, 151, 0.5);
  transform: rotate(90deg);
  transform-origin: 0 0; // add this line to rotate around the top-left corner
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

export default TestPage;
