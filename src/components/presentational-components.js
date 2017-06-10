import styled from 'styled-components';

import { BLUE, DARK_BLUE, GRAY_BLUE, DARK_GRAY_BLUE } from '../constants';


export const ReduceStatement = styled.div`
  font-size: 22px;
  font-family: monospace;
`;

export const Card = styled.div`
  background: #FFF;
  border-radius: 4px;
  min-height: 190px;
  margin: auto;
  padding: 2rem;
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
  border-bottom: 2px solid rgba(0,0,0,0.1);

  @media (max-width: 600px) {
    margin-left: -16px;
    margin-right: -16px;
    padding: 1rem;
  }
`;

export const Button = styled.button`
  padding: 15px 45px;
  background-color: ${BLUE};
  border: none;
  border-bottom: 3px solid ${DARK_BLUE};
  border-radius: 5px;
  color: #FFF;
  font-size: 18px;
  min-width: 200px;

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
  width: calc(100% - 32px);
  max-width: 725px;
  padding: 16px;
  margin: 0 auto;
`;

export const Small = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 14px;
  color: #AAA;
`;
