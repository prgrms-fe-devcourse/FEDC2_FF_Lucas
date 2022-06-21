import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";

const CardForm = styled.form`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 70%;
  margin: 0 35%;
  justify-content: center;
  text-align: center;
  gap: 30px;
`;

const SignUpHeader = styled.h1`
  font-size: 50px;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirm: "",
    },
    onSubmit: async ({ email, fullName, password }) => {
      try {
        await axios({
          method: "POST",
          url: "/signup",
          data: {
            email,
            fullName,
            password,
          },
        });
        navigate("/login", { replace: true });
      } catch (e) {
        alert(`회원가입 실패.\n ${e}`);
      }
    },
    validate: ({ email, fullName, password, passwordConfirm }) => {
      const newErrors = {};

      if (!email) {
        newErrors.email = "이메일을 입력해주세요.";
      }
      if (!/^.+@.+\..+$/.test(email)) {
        newErrors.email = "올바른 이메일을 입력해주세요.";
      }
      if (!fullName) {
        newErrors.fullName = "이름를 입력해주세요.";
      }
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
    <CardForm onSubmit={handleSubmit}>
      <FormWrapper>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <SignUpHeader>Fashion Feedback</SignUpHeader>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            style={{
              width: "70%",
              textAlign: "center",
              height: "50px",
            }}
            onChange={handleChange}
          />
          {errors.email && (
            <Text size="20px" color="red">
              {errors.email}
            </Text>
          )}
          <Input
            type="name"
            name="fullName"
            placeholder="Name"
            style={{
              width: "70%",
              textAlign: "center",
              height: "50px",
            }}
            onChange={handleChange}
          />
          {errors.fullName && (
            <Text size="20px" color="red">
              {errors.fullName}
            </Text>
          )}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            style={{
              width: "70%",
              textAlign: "center",
              height: "50px",
            }}
            onChange={handleChange}
          />
          {errors.password && (
            <Text size="20px" color="red">
              {errors.password}
            </Text>
          )}
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm"
            style={{
              width: "70%",
              textAlign: "center",
              height: "50px",
            }}
            onChange={handleChange}
          />
          {errors.passwordConfirm && (
            <Text size="20px" color="red">
              {errors.passwordConfirm}
            </Text>
          )}
        </div>
        <ButtonWrapper>
          <Button
            type="submit"
            disabled={isLoading}
            style={{ width: "70%", height: "50px" }}
          >
            회원가입
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </CardForm>
  );
};

export default SignUp;
