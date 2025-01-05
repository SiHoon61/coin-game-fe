import { css } from '@emotion/react';
import { Button, Form, Input } from 'antd';
import { useState, useRef } from 'react';
import { requestSignin } from 'api/requests/requestAuth';
import { useNavigate } from 'react-router-dom';
import { colorLight } from 'styles/colors';
import { useUserInfoStore } from 'stores/userInfoStore';
import { useMutation } from '@tanstack/react-query';
import { getUpbitData } from 'api/requests/requestCoin';
import { transformCoinData } from 'views/CoinConverter';
import { useCoinListStore, useUserClickStreamStore } from 'stores/userInfoStore';
import { useUserAnalysisStore } from 'stores/userInfoStore';
import { getUserAnalysis } from 'api/requests/requestUserData';
const websocketURL = import.meta.env.VITE_WEBSOCKET_API;

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .ant-form-item {
    margin-bottom: 15px;
  }
`;

const titleCss = css`
  font-size: 56px;
  font-family: 'GmarketSans-Medium';
  margin-bottom: 10px;
`;

const inputCss = css`
  width: 250px;
  height: 36px;
`;

const btnContainerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const startBtnCss = css`
  width: 250px;
  height: 40px;
  color: white;
  background-color: ${colorLight.mainBtnColor};
  font-size: 16px;
  font-family: 'GmarketSans-Medium';
`;

const rankBtnCss = css`
  width: 120px;
  height: 40px;
  color: white;
  background-color: ${colorLight.subBtnColor};
  font-size: 16px;
  font-family: 'GmarketSans-Medium';
`;

type FieldType = {
  name: string;
  affiliation: string;
  nickname: string;
};

function SigninPanel() {
  const upbitData = useMutation({
    mutationFn: getUpbitData,
    onSuccess: (data) => {
      const coinList = transformCoinData(data);
      useCoinListStore.getState().changeCoinList(coinList);
    },
    onError: () => {
      console.log('error');
    },
    onMutate: () => {},
  });

  const setUserAnalysis = useUserAnalysisStore((state) => state.setUserAnalysis);
  const userAnalysis = useMutation({
    mutationFn: getUserAnalysis,
    onSuccess: (data) => {
      setUserAnalysis(data);
    },
  });

  const navigate = useNavigate();

  const handleRank = () => {
    navigate('/rank');
  };

  const handleAnalysis = () => {
    navigate('/analysis');
  };

  const onFinish = (values: any) => {
    upbitData.mutate();
    userAnalysis.mutate();
    console.log(values);
    useUserInfoStore.getState().changeUserInfo({ ...values, reTryCount: 2, highScore: 0 });
    useUserClickStreamStore.getState().resetState();
    requestSignin();
    navigate('/');
  };

  // const [output, setOutput] = useState<string[]>([]);
  // const socketRef = useRef<WebSocket | null>(null);

  // const logOutput = (message: string) => {
  //   setOutput((prev) => [...prev, message]);
  // };

  // const connectWebSocket = () => {
  //   const url = websocketURL;

  //   // WebSocket 객체 생성
  //   const socket = new WebSocket(url);
  //   socketRef.current = socket;

  //   socket.onopen = () => logOutput('WebSocket 연결 성공!');
  //   socket.onmessage = (event) => logOutput(`수신 데이터: ${event.data}`);
  //   socket.onclose = () => logOutput('WebSocket 연결 종료');
  //   socket.onerror = (error) => logOutput(`에러 발생: ${error}`);
  // };

  // const disconnectWebSocket = () => {
  //   if (socketRef.current) {
  //     socketRef.current.close();
  //     socketRef.current = null;
  //   }
  // };

  // const sendRequest = () => {
  //   if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
  //     const message = JSON.stringify({ action: 'getData' }); // Lambda에서 처리되는 액션 이름
  //     socketRef.current.send(message);
  //     logOutput('데이터 요청 전송 완료');
  //   } else {
  //     logOutput('WebSocket 연결이 없습니다.');
  //   }
  // };

  // const stopRequest = () => {
  //   if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
  //     const message = JSON.stringify({ action: 'stopData' }); // Lambda에서 처리되는 액션 이름
  //     socketRef.current.send(message);
  //     logOutput('데이터 요청 중지 전송 완료');
  //   } else {
  //     logOutput('WebSocket 연결이 없습니다.');
  //   }
  // };

  return (
    <>
      {/* <div>
        <h2>WebSocket 테스트</h2>
        <button onClick={connectWebSocket}>연결</button>
        <button onClick={disconnectWebSocket}>연결 해제</button>
        <button onClick={sendRequest}>데이터 요청</button>
        <button onClick={stopRequest}>데이터 요청 중지</button>
        <pre>{output.join('\n')}</pre>
      </div> */}
      <div css={containerCss}>
        <div css={titleCss}>코인예측왕</div>
        <Form onFinish={onFinish}>
          <Form.Item<FieldType>
            name="name"
            rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
          >
            <Input css={inputCss} placeholder="닉네임" />
          </Form.Item>
          <Form.Item<FieldType>
            name="affiliation"
            rules={[{ required: true, message: '소속을 입력해주세요.' }]}
          >
            <Input css={inputCss} placeholder="소속" />
          </Form.Item>
          {/* <Form.Item<FieldType>
          name="student_id"
          rules={[{ required: true, message: '학번을 입력해주세요.' }]}
        >
          <Input css={inputCss} placeholder="학번" />
        </Form.Item> */}
          <Form.Item<FieldType> name="nickname">
            <Input css={inputCss} placeholder="이메일(선택항목)" />
          </Form.Item>
          <div>이메일은 경품 전달을 위해서만 사용됩니다</div>
          <div css={btnContainerCss}>
            <Button type="primary" htmlType="submit" css={startBtnCss}>
              게임 시작
            </Button>
            <div
              css={css`
                display: flex;
                gap: 10px;
              `}
            >
              <Button css={rankBtnCss} onClick={handleRank}>
                랭킹 확인
              </Button>
              <Button css={rankBtnCss} onClick={handleAnalysis}>
                통계 확인
              </Button>
            </div>
          </div>
        </Form>
        <div
          css={css`
            position: absolute;
            left: 10px;
            bottom: 10px;
          `}
        >
          <p
            css={css`
              font-size: 14px;
            `}
          >
            Contact Us
          </p>
          FE: dlatlgns000@gmail.com
          <br /> BE/DE: yih5025@gmail.com
          <br /> AI: pomatoyeah@gmail.com
        </div>
      </div>
    </>
  );
}

export { SigninPanel };
