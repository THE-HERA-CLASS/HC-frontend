import React from 'react';
import { styled } from 'styled-components';
import Card from './Card';

function CardArea() {
  return (
    <Area>
      <Card />
      <Card />
      <Card />
      <Card />
    </Area>
  );
}

const Area = styled.div`
  width: 100%;

  margin-bottom: 82px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  gap: 24px;
`;
export default CardArea;
