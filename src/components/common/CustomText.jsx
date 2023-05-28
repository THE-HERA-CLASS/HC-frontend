import React from 'react';
import { styled } from 'styled-components';

// 글자에 스타일을 넣기 위한 컴포넌트입니다.

function CustomText(props) {
  const { children, fontSize, color, fontWeight, margin, cursor, onClick } = props;
  return (
    <TextStyled
      fontSize={fontSize}
      color={color}
      fontWeight={fontWeight}
      margin={margin}
      cursor={cursor}
      onClick={onClick}>
      {children}
    </TextStyled>
  );
}

const TextStyled = styled.div`
  cursor: ${({ cursor }) => `${cursor}`};
  font-size: ${({ fontSize }) => `${fontSize}`};
  font-weight: ${({ fontWeight }) => `${fontWeight}`};
  color: ${({ color }) => `${color}`};
  margin: ${({ margin }) => (margin ? `${margin}` : null)};
`;
export default CustomText;
