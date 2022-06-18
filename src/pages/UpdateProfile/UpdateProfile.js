import styled from "@emotion/styled";
import { Camera } from "react-feather";
import UpperHeader from "../../components/Header/UpperHeader";
import Image from "../../components/Image/Image";
import Input from "../../components/Input/Input";
import Text from "../../components/Text/Text";

const Header = styled.header`
  position: sticky;
`;

const Main = styled.main`
  text-align: center;
`;

const ImageWrapper = styled.div`
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
  background-color: white;
`;

const InputWrapper = styled.div`
  padding: 2%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const UpdateProfile = () => (
  <>
    <Header>
      <UpperHeader />
    </Header>

    <Main>
      <ImageWrapper>
        <Image
          src="https://picsum.photos/200"
          width="350px"
          height="350px"
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            margin: "10% 0",
          }}
        />
        <IconWrapper>
          <Camera width="50px" height="50px" />
        </IconWrapper>
      </ImageWrapper>

      <InputWrapper>
        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              닉네임
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>

        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              현재 비밀번호
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>

        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              비밀번호
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>

        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              비밀번호 확인
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>

        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              키
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>

        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              몸무게
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>

        <FlexDiv>
          <span style={{ margin: "10px", width: "150px" }}>
            <Text size="20px" color="gray" bold="true">
              나이
            </Text>
          </span>
          <Input wrapperStyles={{ width: "40%" }} />
        </FlexDiv>
      </InputWrapper>
    </Main>
  </>
);

export default UpdateProfile;
