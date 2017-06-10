import styled from 'styled-components';

import { BLUE, DARK_BLUE, GRAY_BLUE, DARK_GRAY_BLUE } from '../constants';


export const ReduceStatement = styled.div`
  font-size: 22px;
  font-family: monospace;
`;

export const Card = styled.div`
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.1);
  min-height: 190px;
  margin: auto;
  padding: 2rem;
`;

export const Button = styled.button`
  padding: 15px 45px;
  background-color: ${BLUE};
  border: none;
  border-bottom: 3px solid ${DARK_BLUE};
  border-radius: 5px;
  color: #FFF;
  font-size: 18px;

  &:disabled {
    background-color: ${GRAY_BLUE};
    border-bottom: 3px solid ${DARK_GRAY_BLUE}
  }
`;

export const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  letter-spacing: -2px;
  color: #222;
`;

export const HeaderParagraph = styled.p`
  font-size: 22px;
  line-height: 1.4;
  color: #444;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 725px;
  padding: 1rem;
  margin: 0 auto;
`;

export const Small = styled.span`
  display: inline-block;
  text-align: center;
  padding: 1rem;
  font-size: 14px;
  color: #AAA;
`;
