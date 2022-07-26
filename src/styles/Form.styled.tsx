import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import {
  RadioStyledProps,
  ToggleStyledProps,
  CheckboxStyledProps,
} from "../types/Form.type";

// form의 title들에 사용한 컴포넌트(radioContariner제외)

export const StyledForm = styled.form`
  position: relative;
  //height: 100vh;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
`;

export const DataTitle = styled.div`
  padding: 20px;
  font-weight: bold;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export const DataTitleRow = styled(DataTitle)`
  flex-direction: row;
`;

export const RadioContainer = styled(DataTitleRow)`
  padding: 0;
  padding-left: 12px;
`; //form의 title에 사용한건 아니지만 DataTitle로 만든 컴포넌트라 여기에 넣음!

export const SubTitle = styled.p`
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  color: var(--color-subtitle);
  margin-top: 8px;
`;

//form의 input들에 사용한 컴포넌트
export const DataInput = styled.input`
  width: 90%;
  border-bottom: 1.5px solid var(--color-gray);
  padding-top: 12px;
  padding-bottom: 12px;

  &::placeholder {
    color: var(--color-gray);
  }
`;

export const NoneDisplayInput = styled.input`
  display: none;
`;

//radio에 사용한 label(RadioContainer는 맨 처음부분에 위치함)
const StyledRadioLabel = styled.label<{ selected: boolean }>`
  width: 4rem;
  margin-right: 3rem;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-gray);
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      color: var(--color-black);
    `};
`;

export const RadioLabel = (props: RadioStyledProps) => (
  <StyledRadioLabel {...props}>{props.children}</StyledRadioLabel>
);

//checkbox 컨테이너와 label
export const CheckBoxContainer = styled.div`
  height: 74px;
  padding: 5px 10px;
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;

export const StyledCheckboxLabel = styled.label<{ selected: boolean }>`
  border: 2px solid;
  border-radius: 20px;
  padding: 8px 10px;
  margin-left: 8px;
  color: var(--color-gray);
  font-size: 13px;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    css`
      color: var(--color-black);
    `};
`;

export const CheckBoxLabel = (props: CheckboxStyledProps) => (
  <StyledCheckboxLabel {...props}>{props.children}</StyledCheckboxLabel>
);

//개인정보 토글 컨테이너와 버튼
export const DataToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledBtn = styled.button<{ agreement: boolean }>`
  display: flex;
  align-items: center;
  padding-right: 8px;
  color: var(--color-gray);
  cursor: pointer;

  ${(props) =>
    props.agreement &&
    css`
      color: var(--color-black);
    `};
`;

export const DataToggle = (props: ToggleStyledProps) => (
  <StyledBtn {...props}>{props.children}</StyledBtn>
);

//개인정보 토글 컨테이너와 버튼 포지셔닝 컴포넌트
export const Positioner = styled.div`
  width: 90%;
  padding: 15px 0;
  margin: 0 auto;
  border-top: 2px solid var(--color-black);
`;

export const Stretcher = styled.div`
  font-weight: bold;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
`;

//routing 버튼 & submit 버튼
export const LinkButton = styled(Link)`
  padding: 0 5px;
  display: flex;
  align-items: center;
`;