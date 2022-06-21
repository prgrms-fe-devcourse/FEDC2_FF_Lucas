import styled from "@emotion/styled";
import axios from "axios";
import { Save } from "react-feather";
import UpperHeader from "../../components/Header/UpperHeader";
// import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import { useGlobalContext } from "../../store/GlobalProvider";
import useForm from "../../hooks/useForm";
import parseJsonStringToObject from "../../utils/parseJsonString";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { updateProfileImage } from "../../utils/apis/users";

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
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0, 450%);
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: transparent;
  cursor: pointer;
`;

const InputWrapper = styled.form`
  display: grid;
  margin-bottom: 3%;
  padding: 2%;
  margin: 2%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  position: relative;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const ProfileImage = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background-color: #d9d9d9;
  overflow: hidden;
  &:hover {
    background-color: "#4f508f";
  }
  &:active {
    background-color: "#434379";
  }
`;

const UpdateProfile = () => {
  const { state, setUser, storedToken } = useGlobalContext();
  const jsonString = state.userInfo.user && state.userInfo.user.username;
  const defaultFullName =
    (state.userInfo.user && state.userInfo.user.fullName) || "";
  const defaultImage = (state.userInfo && state.userInfo.user.image) || "";
  const {
    height: defaultHeight,
    weight: defaultWeight,
    age: defaultAge,
  } = parseJsonStringToObject({
    jsonString,
    restKeys: ["height", "weight", "age"],
  });
  const { handleChange: handleImageChange, handleSubmit: handleImageSubmit } =
    useForm({
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
        const userInfoString = JSON.stringify({
          height,
          weight,
          age,
        });
        await axios({
          method: "PUT",
          url: "/settings/update-user",
          headers: { Authorization: `Bearer ${storedToken}` },
          data: {
            fullName,
            username: userInfoString,
          },
        });
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
        await axios({
          method: "PUT",
          url: "/settings/update-password",
          headers: { Authorization: `Bearer ${storedToken}` },
          data: {
            password,
          },
        });
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

  return (
    <>
      <Header>
        <UpperHeader />
      </Header>
      <Main>
        <ImageWrapper onSubmit={handleImageSubmit}>
          <ImageUpload
            name="image"
            isInnerPreview
            wrapperStyles={{ margin: "10% 0" }}
            prevImageUrl={defaultImage}
            previewImageStyles={{
              width: "100%",
              height: "100%",
              mode: "cover",
            }}
            onChange={handleImageChange}
          >
            <ProfileImage />
          </ImageUpload>
          <IconWrapper>
            <Button
              type="submit"
              width="80px"
              height="80px"
              borderRadius="100%"
            >
              <Save width="50px" height="50px" />
            </Button>
          </IconWrapper>
        </ImageWrapper>
        <InputWrapper onSubmit={handleInfoSubmit}>
          <FlexDiv>
            <span style={{ margin: "10px", width: "150px" }}>
              <Text size="20px" color="gray" bold="true">
                닉네임
              </Text>
            </span>
            <Input
              type="name"
              name="fullName"
              wrapperStyles={{ width: "40%" }}
              onChange={handleInfoChange}
              defaultValue={defaultFullName}
            />
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
            <Input
              type="name"
              name="height"
              defaultValue={defaultHeight}
              wrapperStyles={{ width: "40%" }}
              onChange={handleInfoChange}
            />
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
            <Input
              type="name"
              name="weight"
              defaultValue={defaultWeight}
              wrapperStyles={{ width: "40%" }}
              onChange={handleInfoChange}
            />
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
            <Input
              type="name"
              name="age"
              defaultValue={defaultAge}
              wrapperStyles={{ width: "40%" }}
              onChange={handleInfoChange}
            />
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
            width="20%"
            height="50px"
            style={{ position: "relative", marginTop: "20px", left: "40%" }}
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
            <Input
              type="password"
              name="password"
              wrapperStyles={{ width: "40%" }}
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
            <Input
              type="password"
              name="passwordConfirm"
              wrapperStyles={{ width: "40%" }}
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
            width="20%"
            height="50px"
            style={{ position: "relative", marginTop: "20px", left: "40%" }}
          >
            비밀번호 변경
          </Button>
        </InputWrapper>
      </Main>
    </>
  );
};

export default UpdateProfile;
