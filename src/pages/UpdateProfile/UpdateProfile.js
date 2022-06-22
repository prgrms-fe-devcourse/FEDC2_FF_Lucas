import styled from "@emotion/styled";
import { Camera } from "react-feather";
import { useEffect, useRef, useState } from "react";
import UpperHeader from "../../components/Header/UpperHeader";
import Input from "../../components/Input/Input";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import { useGlobalContext } from "../../store/GlobalProvider";
import useForm from "../../hooks/useForm";
import parseJsonStringToObject from "../../utils/parseJsonString";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import {
  updateProfileImage,
  updateUserInfo,
  updatePassword,
} from "../../utils/apis/users";
import DEFAULT_PROFILE_IMAGE_URL from "../../utils/constants";

const Header = styled.header`
  position: sticky;
`;

const Main = styled.main`
  text-align: center;
`;

const ImageWrapper = styled.form`
  position: relative;
  display: inline-block;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: transparent;
  cursor: pointer;
`;

const InputWrapper = styled.form`
  display: grid;
  margin-bottom: 3%;
  padding: 2%;
  padding-right: 5%;
  margin: 0 15%;
  margin-bottom: 2%;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.05);
  place-items: center;
  // position: relative;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const StyledInput = styled(Input)`
  border-radius: 10px;
  background-color: white;
  border: none;
  outline: none;
`;

const HiddenSubmit = styled.button`
  display: "none";
`;

const UpdateProfile = () => {
  const { state, setUser, storedToken } = useGlobalContext();
  const jsonString = state.userInfo.user && state.userInfo.user.username;
  const defaultFullName =
    (state.userInfo.user && state.userInfo.user.fullName) || "";
  const defaultImage =
    (state.userInfo && state.userInfo.user.image) || DEFAULT_PROFILE_IMAGE_URL;
  const {
    height: defaultHeight,
    weight: defaultWeight,
    age: defaultAge,
  } = parseJsonStringToObject({
    jsonString,
    restKeys: ["height", "weight", "age"],
  });
  const {
    values: { image: changedImage },
    handleChange: handleImageChange,
    handleSubmit: handleImageSubmit,
  } = useForm({
    initialValues: {
      image: defaultImage || "",
    },
    onSubmit: async ({ event }) => {
      const changedImgae =
        event.target.image.files && event.target.image.files[0];

      try {
        const nextUser = await updateProfileImage({
          image: changedImgae,
          token: storedToken,
        });
        setUser({ user: nextUser, token: storedToken });
        alert("프로필 이미지를 변경했습니다.");
      } catch (e) {
        alert(`프로필 이미지 수정 실패 ${e}`);
      }
    },
    validate: ({ image }) => {
      const error = {};
      if (!image) {
        error.image = "이미지를 등록해주세요";
      }
      return error;
    },
  });

  const {
    errors,
    handleChange: handleInfoChange,
    handleSubmit: handleInfoSubmit,
  } = useForm({
    initialValues: {
      fullName: defaultFullName,
      height: defaultHeight,
      weight: defaultWeight,
      age: defaultAge,
    },
    onSubmit: async ({ fullName, height, weight, age }) => {
      try {
        const nextUser = await updateUserInfo({
          fullName,
          username: JSON.stringify({
            height,
            weight,
            age,
          }),
          token: storedToken,
        });

        setUser({ user: nextUser, token: storedToken });
        alert("회원정보를 변경했습니다.");
      } catch (e) {
        alert(`회원정보 변경 실패.\n ${e}`);
      }
    },
    validate: ({ fullName, height, weight, age }) => {
      const newErrors = {};

      if (!fullName) {
        newErrors.fullName = "닉네임을 입력해주세요.";
      }
      if (height && !/^\d+$/.test(height)) {
        newErrors.height = "숫자만 입력해주세요.";
      }
      if (weight && !/^\d+$/.test(weight)) {
        newErrors.height = "숫자만 입력해주세요.";
      }
      if (age && !/^\d+$/.test(age)) {
        newErrors.height = "숫자만 입력해주세요.";
      }

      return newErrors;
    },
  });
  const {
    errors: error,
    handleChange: handlePasswordChange,
    handleSubmit: handlePasswordSubmit,
  } = useForm({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async ({ password }) => {
      try {
        await updatePassword({ password, token: storedToken });

        alert("비밀번호를 변경했습니다.");
      } catch (e) {
        alert(`비밀번호 변경 실패.\n ${e}`);
      }
    },
    validate: ({ password, passwordConfirm }) => {
      const newErrors = {};

      if (!password) {
        newErrors.password = "비밀번호를 입력해주세요.";
      }
      if (!passwordConfirm) {
        newErrors.passwordConfirm = "비밀번호를 다시 입력해주세요.";
      }
      if (password !== passwordConfirm) {
        newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      }
      return newErrors;
    },
  });
  const [countClick, setCountClick] = useState(0);
  const imageFormRef = useRef(null);

  useEffect(() => {
    if (countClick === 0) {
      return;
    }

    imageFormRef.current.click();
  }, [changedImage]);

  return (
    <>
      <Header>
        <UpperHeader />
      </Header>
      <Main>
        <ImageWrapper onSubmit={handleImageSubmit}>
          <HiddenSubmit type="submit" ref={imageFormRef} />
          <ImageUpload
            name="image"
            prevImageUrl={defaultImage}
            wrapperStyles={{
              position: "relative",
            }}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              transform: "translate(0, 270%)",
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              backgroundColor: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            previewImageWrapperStyles={{
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              backgroundColor: "#d9d9d9",
              overflow: "hidden",
              margin: "10% 0",
            }}
            previewImageStyles={{
              width: "100%",
              height: "100%",
              mode: "cover",
            }}
            onChange={handleImageChange}
          >
            <IconWrapper>
              <Button
                type="button"
                width="80px"
                height="80px"
                borderRadius="100%"
                onClick={() => setCountClick(countClick + 1)}
              >
                <Camera width="50px" height="50px" />
              </Button>
            </IconWrapper>
          </ImageUpload>
        </ImageWrapper>
        <InputWrapper onSubmit={handleInfoSubmit}>
          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                닉네임
              </Text>
            </span>
            <StyledInput
              type="name"
              name="fullName"
              wrapperStyles={{ width: "50%" }}
              onChange={handleInfoChange}
              defaultValue={defaultFullName}
            />
            <span style={{ marginRight: "25px" }} />
          </FlexDiv>
          {document.getElementsByName("fullName").value && errors.fullName && (
            <Text
              style={{
                fontSize: "15px",
                color: "red",
                marginLeft: "-15%",
              }}
            >
              {errors.fullName}
            </Text>
          )}

          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                키
              </Text>
            </span>
            <StyledInput
              type="name"
              name="height"
              defaultValue={defaultHeight}
              wrapperStyles={{ width: "50%" }}
              onChange={handleInfoChange}
            />
            <span style={{ marginRight: "25px" }} />
          </FlexDiv>
          {errors.height && (
            <Text
              style={{
                fontSize: "15px",
                color: "red",
                marginLeft: "-15%",
              }}
            >
              {errors.height}
            </Text>
          )}

          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                몸무게
              </Text>
            </span>
            <StyledInput
              type="name"
              name="weight"
              defaultValue={defaultWeight}
              wrapperStyles={{ width: "50%" }}
              onChange={handleInfoChange}
            />
            <span style={{ marginRight: "25px" }} />
          </FlexDiv>
          {errors.weight && (
            <Text
              style={{
                fontSize: "15px",
                color: "red",
                marginLeft: "-15%",
              }}
            >
              {errors.weight}
            </Text>
          )}

          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                나이
              </Text>
            </span>
            <StyledInput
              type="name"
              name="age"
              defaultValue={defaultAge}
              wrapperStyles={{ width: "50%" }}
              onChange={handleInfoChange}
            />
            <span style={{ marginRight: "25px" }} />
          </FlexDiv>
          {errors.age && (
            <Text
              style={{
                fontSize: "15px",
                color: "red",
                marginLeft: "-15%",
              }}
            >
              {errors.age}
            </Text>
          )}

          <Button
            type="submit"
            width="40%"
            height="50px"
            style={{ position: "relative", marginTop: "20px", left: "2%" }}
          >
            회원정보 변경
          </Button>
        </InputWrapper>

        <InputWrapper onSubmit={handlePasswordSubmit}>
          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                비밀번호 변경
              </Text>
            </span>
            <StyledInput
              type="password"
              name="password"
              wrapperStyles={{ width: "50%" }}
              onChange={handlePasswordChange}
            />
          </FlexDiv>
          {error.password && (
            <Text
              style={{ fontSize: "15px", color: "red", marginLeft: "-15%" }}
            >
              {error.password}
            </Text>
          )}

          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                비밀번호 확인
              </Text>
            </span>
            <StyledInput
              type="password"
              name="passwordConfirm"
              wrapperStyles={{ width: "50%" }}
              onChange={handlePasswordChange}
            />
          </FlexDiv>
          {error.passwordConfirm && (
            <Text
              style={{
                fontSize: "15px",
                color: "red",
                marginLeft: "-13%",
              }}
            >
              {error.passwordConfirm}
            </Text>
          )}
          <Button
            type="submit"
            width="40%"
            height="50px"
            style={{ position: "relative", marginTop: "20px", left: "2%" }}
          >
            비밀번호 변경
          </Button>
        </InputWrapper>
      </Main>
    </>
  );
};

export default UpdateProfile;
