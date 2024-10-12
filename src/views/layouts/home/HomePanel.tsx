import { css } from '@emotion/react';
import { useState } from 'react';
import { colorLight } from 'styles/colors';
import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { requestSignout } from 'api/requests/requestAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const tutorialTextCss = css`
  align-content: center;
  height: 100px;
  font-size: 32px;
  text-align: center;
  font-family: 'SpoqaHanSansNeo-Bold';
`;

const btnContainerCss = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const prevBtnCss = css`
  width: 80px;
  height: 40px;
  font-size: 20px;
  color: white;
  background-color: ${colorLight.subBtnColor};
  font-family: 'GmarketSans-Bold';
  outline: none;
  &:focus {
    outline: none;
  }
`;

const nextBtnCss = css`
  width: 120px;
  height: 40px;
  font-size: 20px;
  color: white;
  background-color: ${colorLight.mainBtnColor};
  font-family: 'GmarketSans-Bold';
  outline: none;
  &:focus {
    outline: none;
  }
`;

function HomePanel() {
  const navigate = useNavigate();

  const [tutorialIdx, setTutorialIdx] = useState(0);
  const tutorial = [
    '코인 예측왕 게임은 실시간 비트코인 가격을 바탕으로 모의투자를 즐길 수 있는 게임입니다',
    '자신이 선택한 종목의 10초 뒤 가격 변동을 예측하여 투자하고, <br />10초 후의 가격 변동에 따라 점수를 얻게 됩니다',
    '9개의 비트코인 종목 중에서, 가장 유망해 보이는 3개의 그래프를 골라주세요<br />제한 시간은 30초 입니다',
  ];

  const handleStartGame = () => {
    navigate('/select-coin');
  };

  return (
    <div css={containerCss}>
      <AnimatePresence mode="wait">
        <motion.div
          key={tutorialIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          css={tutorialTextCss}
          dangerouslySetInnerHTML={{ __html: tutorial[tutorialIdx] }}
        />
      </AnimatePresence>
      <div css={btnContainerCss}>
        {tutorialIdx === 0 ? (
          ''
        ) : (
          <Button css={prevBtnCss} onClick={() => setTutorialIdx(tutorialIdx - 1)}>
            이전
          </Button>
        )}
        {tutorialIdx === 2 ? (
          <Button css={nextBtnCss} onClick={handleStartGame}>
            준비 완료!
          </Button>
        ) : (
          <Button css={nextBtnCss} onClick={() => setTutorialIdx(tutorialIdx + 1)}>
            다음
          </Button>
        )}
      </div>
    </div>
  );
}

export { HomePanel };
