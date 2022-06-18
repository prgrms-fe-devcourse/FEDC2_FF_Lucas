// import PropTypes from "prop-types";
import styled from "@emotion/styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";
import { useGlobalContext } from "../../store/GlobalProvider";

const CardForm = styled.form`
  padding: 0 10%;
  width: 1000px;
  height: 700px;
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FormWrapper = styled.div`
  padding: 15% 0;
  height: 70%;
  display: grid;
`;

const LoginHeader = styled.h1`
  font-size: 50px;
  display: grid;
  place-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Login = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const { errors, isLoading, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    // onSubmit: async userInfo => {
    //   await handleLogin(userInfo);
    // },
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
        console.error(e);
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
        <LoginHeader>Fashion Feedback</LoginHeader>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          style={{
            height: "60px",
            marginBottom: "-20px",
            display: "grid",
            placeItems: "center",
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
            height: "60px",
            marginBottom: "-20px",
            display: "grid",
            placeItems: "center",
          }}
          onChange={handleChange}
        />
        {errors.password && (
          <Text size="20px" color="red">
            {errors.password}
          </Text>
        )}
        <ButtonWrapper>
          <Button type="submit" disabled={isLoading}>
            로그인
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            style={{ marginLeft: "16px" }}
          >
            회원가입
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </CardForm>
  );
};

// Login.propTypes = {
//   onSubmit: PropTypes.func,
// };

export default Login;
