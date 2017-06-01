import styled from 'styled-components';


export const Separator = styled.span`
  color: palevioletred;
  padding: 1rem;
`;

export const Span = styled.span`
  display: inline-block;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Col = styled.div`
  position: relative;
  flex: 1;
`

export const LandingPadTestDiv = styled.div`
  position: absolute;
  left: 100px;
  top: 300px;
  width: 25px;
  height: 25px;
  border: 2px solid palevioletred;
`;

export const ReduceStatement = styled.div`
  font-size: 22px;
  font-family: monospace;
`;

export const Card = styled.div`
  background: #FAFAFA;
  border-radius: 4px;
  box-shadow: 0px 2px 3px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: auto;
  padding: 2rem;
`;

export const BackgroundItemSet = styled.div`
  position: absolute;
  zIndex: 1;
  font-size: 22px;
  letter-spacing: 2;
  font-weight: bold;
  color: #CCC;
`;

export const ForegroundItemSet = BackgroundItemSet.extend`
  position: relative;
  z-index: 2;
  color: black;
`;

export const Button = styled.button`
  padding: 10px 25px;
`
