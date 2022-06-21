import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";
import { useGlobalContext } from "../../store/GlobalProvider";

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

const LoginHeader = styled.h1`
  font-size: 50px;
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Login = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: "/login",
          data: {
            email,
            password,
          },
        });
        setUser(data);
        navigate("/", { replace: true });
      } catch (e) {
        alert(`로그인 실패.\n ${e}`);
      }
    },
    validate: ({ email, password }) => {
      const newErrors = {};
      if (!email) newErrors.email = "이메일을 입력해주세요.";
      if (!password) newErrors.password = "비밀번호를 입력해주세요.";
      return newErrors;
    },
  });

  return (
    <CardForm onSubmit={handleSubmit}>
      <FormWrapper>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <LoginHeader>Fashion Feedback</LoginHeader>
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
        </div>
        <ButtonWrapper>
          <Button
            type="submit"
            disabled={isLoading}
            style={{ width: "70%", height: "50px" }}
          >
            로그인
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            style={{ width: "70%", height: "50px" }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </CardForm>
  );
};

export default Login;
