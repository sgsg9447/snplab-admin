import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsCheckCircle, BsCheck } from "react-icons/bs";
import ModalBackground from "../modal/ModalBackground";
import FormInput from "./FormInput";
import { useForm, FormProvider } from "react-hook-form";
import { applyService, postApplicantsData } from "../../api/api";
import * as FormStyle from "../../styles/Form.styled";
import { SubmitButton } from "../../styles/template";
import { RadioState, PolicyState, CheckboxState } from "../../types/Form.type";
import transportations from "../../asset/transportaions";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { radioState, radioInitialState } from "../../store/radioAtom";
import { regionState } from "../../store/atom";
import { RegionAtomType } from "../../types/Region.type";
import RegionModal from "../modal/RegionModal";
import PrivacyModal from "../modal/PrivacyModal";
import ThirdPartyModal from "../modal/ThirdPartyModal";
import ConfirmModal from "../modal/ConfirmModal";
import { IFormInputs } from "../../types/FormInput.type";

const Form = () => {
  const [showRegionModal, setShowRegionModal] = React.useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] =
    React.useState<boolean>(false);
  const [showThirdpartyModal, setShowThirdpartyModal] =
    React.useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] =
    React.useState<boolean>(false);
  const setRadio = useSetRecoilState(radioInitialState);
  const radio = useRecoilValue<RadioState>(radioState);
  const [policy, setPolicy] = React.useState<PolicyState>({
    privacy: false,
    thirdparty: false,
  });
  const [checkbox, setCheckbox] = React.useState<CheckboxState>(
    new Array(8).fill(false)
  );
  const region = useRecoilValue<RegionAtomType>(regionState);
  const resetRegionData = useResetRecoilState(regionState);
  const [formData, setFormData] = React.useState({
    id: 0,
    name: "",
    gender: "",
    birthday: "",
    region: [],
    contact: 0,
    email: "",
    transportation: [],
    agreement: false,
    pass: false,
    submitdate: "",
  });
  const { id } = formData;

  const methods = useForm<IFormInputs>({
    defaultValues: {
      gender: "",
      transportation: "",
      agreement: false,
      pass: false,
    },
    mode: "onChange",
  });
  const {
    register,
    formState: { errors, isDirty, isValid },
  } = methods;

  const onSubmit = (data: IFormInputs) => {
    postApplicantsData(applyService, {
      id: id,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      region: data.region,
      contact: data.contact,
      email: data.email,
      transportation: data.transportation,
      agreement: true,
      pass: false,
      submitdate: new Date().toLocaleDateString(),
    });
  };

  const onClick = (checkbox: CheckboxState, index: number) => {
    checkbox.splice(index, 1, !checkbox[index]);
    setCheckbox(checkbox.splice(0, 8).concat(checkbox));
  };

  return (
    <FormProvider {...methods}>
      <FormStyle.StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <FormStyle.DataTitle>??????</FormStyle.DataTitle>
        <FormInput
          placeholder="?????????"
          name="name"
          options={{
            required: true,
            pattern: /^[???-???|???-???|???-???]{2,5}$/,
          }}
        />
        {errors?.name?.type === "required" && <p>????????? ??????????????????</p>}
        {errors?.name?.type === "pattern" && <p>????????? ??????????????????</p>}
        <FormStyle.DataTitle>??????</FormStyle.DataTitle>
        <FormStyle.RadioContainer>
          <FormStyle.RadioLabel
            htmlFor="female"
            selected={radio.female}
            onClick={() => setRadio("female")}
          >
            <FormStyle.NoneDisplayInput
              {...register("gender", { required: true })}
              type="radio"
              name="gender"
              id="female"
              value="???"
            />
            <BsCheckCircle size={24} />
            ??????
          </FormStyle.RadioLabel>
          <FormStyle.RadioLabel
            htmlFor="male"
            selected={radio.male}
            onClick={() => setRadio("male")}
          >
            <FormStyle.NoneDisplayInput
              {...register("gender", { required: true })}
              type="radio"
              name="gender"
              id="male"
              value="???"
            />
            <BsCheckCircle size={24} />
            ??????
          </FormStyle.RadioLabel>
        </FormStyle.RadioContainer>
        <FormStyle.DataTitle>????????????</FormStyle.DataTitle>
        <FormInput
          placeholder="YYYY.MM.DD"
          name="birthday"
          options={{
            required: true,
            maxLength: 10,
            pattern: /^(([0-9]+).{4}([0-9]+).{2}([0-9]+){2})/g,
          }}
        />
        {errors?.birthday?.type === "required" && (
          <p>??????????????? ??????????????????</p>
        )}
        {errors?.birthday?.type === "pattern" && (
          <p>YYYY.MM.DD???????????? ??????????????????</p>
        )}
        <FormStyle.DataTitle>????????????</FormStyle.DataTitle>
        {/* <FormStyle.DataInput
          {...register('region', { required: true })}
          type='text'
          name='region'
          placeholder='???????????? ??????'
          value={`${region.siDo} ${region.siGuGun}`}
          onClick={() => {
            setShowRegionModal(true);
          }}
          readOnly
        /> */}

        <FormInput
          placeholder="????????????"
          onClick={() => {
            setShowRegionModal(true);
          }}
          value={`${region.siDo} ${region.siGuGun}`}
          name="region"
          options={{
            required: true,
          }}
        />
        {showRegionModal && (
          <ModalBackground>
            <RegionModal setShowRegionModal={setShowRegionModal} />
          </ModalBackground>
        )}
        <FormStyle.DataTitle>?????????</FormStyle.DataTitle>
        <FormInput
          placeholder="'-'??????????????????"
          name={"contact"}
          options={{ required: true, maxLength: 11, pattern: /^[0-9]{11}/g }}
        />
        {errors?.contact?.type === "required" && <p>???????????? ??????????????????</p>}
        {errors?.contact?.type === "pattern" && (
          <p>'-'???????????? ????????? ??????????????????</p>
        )}
        <FormStyle.DataTitle>?????????</FormStyle.DataTitle>
        <FormInput
          placeholder="'@', '.com'??????????????????"
          name={"email"}
          options={{
            required: true,
            maxLength: undefined,
            pattern: /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i,
          }}
        />
        {errors?.email?.type === "required" && <p>???????????? ??????????????????</p>}
        {errors?.email?.type === "pattern" && (
          <p>'@', '.com'??? ???????????? ??????????????????</p>
        )}
        <FormStyle.DataTitle>
          ?????? ???????????? ????????????
          <FormStyle.SubTitle>
            ?????? ???????????? ??????????????? ?????? ??????????????????
          </FormStyle.SubTitle>
        </FormStyle.DataTitle>
        <FormStyle.CheckBoxContainer>
          {transportations.map(
            (transportation: string, index: number): JSX.Element => {
              return (
                <FormStyle.CheckBoxLabel
                  htmlFor={transportation}
                  key={index}
                  selected={checkbox[index]}
                  onClick={() => {
                    onClick(checkbox, index);
                  }}
                >
                  <FormStyle.NoneDisplayInput
                    {...register("transportation", { required: true })}
                    type="checkbox"
                    name="transportation"
                    id={transportation}
                    value={transportation}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                  {transportation}
                </FormStyle.CheckBoxLabel>
              );
            }
          )}
        </FormStyle.CheckBoxContainer>
        <FormStyle.DataTitleRow>
          <FormStyle.DataToggleContainer>
            <FormStyle.ButtonLabel
              agreement={policy.privacy && policy.thirdparty}
            >
              <FormStyle.NoneDisplayInput
                type="checkbox"
                {...register("agreement", { required: true })}
                name="agreement"
                value="true"
                onClick={() => {
                  setPolicy((prevState: PolicyState) => {
                    return {
                      ...prevState,
                      privacy: !policy.privacy,
                      thirdparty: !policy.thirdparty,
                    };
                  });
                }}
              />
              <BsCheckCircle size={24} />
            </FormStyle.ButtonLabel>
            ???????????? ?????? ??????
          </FormStyle.DataToggleContainer>
        </FormStyle.DataTitleRow>
        <FormStyle.Positioner>
          <FormStyle.Stretcher>
            <FormStyle.DataToggleContainer>
              <FormStyle.DataToggle
                agreement={policy.privacy}
                onClick={() => {
                  setPolicy((prevState: PolicyState) => {
                    return { ...prevState, privacy: !policy.privacy };
                  });
                }}
              >
                <BsCheck size={24} />
              </FormStyle.DataToggle>
              ???????????? ???????????? ??????(??????)
            </FormStyle.DataToggleContainer>
            <FormStyle.LinkButton
              onClick={() => {
                setShowPrivacyModal(true);
              }}
            >
              {showPrivacyModal && (
                <PrivacyModal
                  setShowPrivacyModal={setShowPrivacyModal}
                  children={{
                    children: undefined,
                  }}
                />
              )}
              <MdArrowForwardIos />
            </FormStyle.LinkButton>
          </FormStyle.Stretcher>
          <FormStyle.Stretcher>
            <FormStyle.DataToggleContainer>
              <FormStyle.DataToggle
                agreement={policy.thirdparty}
                onClick={() => {
                  setPolicy((prevState: PolicyState) => {
                    return { ...prevState, thirdparty: !policy.thirdparty };
                  });
                }}
              >
                <BsCheck size={24} />
              </FormStyle.DataToggle>
              ???3??? ???????????? ??????(??????)
            </FormStyle.DataToggleContainer>
            <FormStyle.LinkButton
              onClick={() => {
                setShowThirdpartyModal(true);
              }}
            >
              {showThirdpartyModal && (
                <ThirdPartyModal
                  setShowThirdpartyModal={setShowThirdpartyModal}
                  children={{
                    children: undefined,
                  }}
                />
              )}
              <MdArrowForwardIos />
            </FormStyle.LinkButton>
          </FormStyle.Stretcher>
        </FormStyle.Positioner>
        <SubmitButton
          type="submit"
          disabled={!isDirty || !isValid}
          onClick={() => {
            setShowConfirmModal(true);
            resetRegionData();
          }}
        >
          ????????????
        </SubmitButton>
        {showConfirmModal && (
          <ModalBackground>
            <ConfirmModal />
          </ModalBackground>
        )}
      </FormStyle.StyledForm>
    </FormProvider>
  );
};

export default Form;
