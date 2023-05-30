import React from 'react';
import { css, styled } from 'styled-components';

//재사용성 컴포넌트
function CustomBtn(props) {
  //프롭스를 구조분해 할당 해서 선언 한 겁니다.
  //bc: background-color
  //outlinecolor: 외과 선 색입니다.
  //linewidth: 선의 굵기입니다.
  //color: 글씨 색입니다.
  //상위 폴더의 버튼 props에 linewidth가 없다면 외각선이 보이지 않습니다.
  const { children, bc, width, height, border, onClick, margin, shadow, type, position, left, top, borderRadius } =
    props;

  return (
    <ButtonStyled
      margin={margin}
      bc={bc}
      width={width}
      height={height}
      border={border}
      shadow={shadow}
      onClick={onClick}
      borderRadius={borderRadius}
      type={type}
      position={position}
      left={left}
      top={top}>
      {children}
    </ButtonStyled>
  );
}
const ButtonStyled = styled.button`
  margin: ${({ margin }) => `${margin}`};
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  border-radius: ${({ borderRadius }) => `${borderRadius}`};
  background-color: ${({ bc }) => `${bc}`};
  box-shadow: ${({ shadow }) => `${shadow}`};
  top: ${({ top }) => `${top}`};
  left: ${({ left }) => `${left}`};
  position: ${({ position }) => `${position}`};
  ${({ border }) =>
    border
      ? css`
          border: ${border};
        `
      : css`
          border: none;
        `}

  &:hover {
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(90%);
  }
  cursor: pointer;
`;

export default CustomBtn;
