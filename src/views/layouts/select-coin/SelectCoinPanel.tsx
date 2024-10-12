import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Progress, Button } from 'antd';
import { BtcKRW } from 'views/layouts/coin-chart/BtcKRW';
import { colorLight } from 'styles/colors';

const containerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const titleTextCss = css`
  align-content: center;
  height: 40px;
  font-size: 32px;
  text-align: center;
  font-family: 'SpoqaHanSansNeo-Bold';
`;

const chartContainerCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  width: 95%;
  height: 80%;
`;

const coinTitleCss = (isSelected: boolean) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'SpoqaHanSansNeo-Bold';
  cursor: pointer;
  font-size: 18px;
  height: 30px;
  background-color: ${isSelected ? '#d1ddf5' : '#ffffff'};
  border-radius: 5px 5px 0 0;
  transition: background-color 0.3s ease;
  padding-left: 5px;
`;

const coinItemCss = css`
  width: 100%;
  height: calc(100% - 50px);
`;

const overlayCSS = css`
  position: fixed;
  top: 10%;
  left: 0;
  width: 100%;
  height: 90%;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: #000000;
  font-size: 24px;
`;

const progressBoxCss = css`
  width: 100%;
  height: 16px;
  display: flex;
  border-radius: 5px;
  justify-content: flex-start;
  background-color: #e2e2e2;
`;

const progressCss = (countdown: number) => css`
  width: ${countdown === 0 ? '0' : '100%'};
  height: 16px;
  border-radius: 5px 0 0 5px;
  background-color: ${colorLight.mainBtnColor};
  transition: width 30s linear;
`;

const buttonContainerCss = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const seleteInfoBoxCss = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
`;

const selectButtonCss = (isSelected: boolean, isDisabled: boolean) => css`
  margin-left: 10px;
  height: 26px;

  background-color: ${isSelected ? colorLight.mainBtnColor : 'white'};
  color: ${isSelected ? 'white' : isDisabled ? '#999' : 'black'};
  cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${isDisabled ? 0.5 : 1};

  outline: none;
  &:focus {
    outline: none;
  }
`;

const recommendCss = css`
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

const nextBtnCss = (isEnabled: boolean) => css`
  width: 120px;
  height: 40px;
  font-size: 20px;
  color: white;
  background-color: ${isEnabled ? colorLight.mainBtnColor : '#cccccc'};
  font-family: 'GmarketSans-Bold';
  outline: none;
  cursor: ${isEnabled ? 'pointer' : 'not-allowed'};
  opacity: ${isEnabled ? 1 : 0.7};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${isEnabled ? colorLight.mainBtnColor : '#cccccc'};
  }
`;

function Overlay({ countdown }: { countdown: number }) {
  const [percent, setPercent] = useState(99);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        if (prevPercent <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevPercent - 4;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div css={overlayCSS}>
      <Progress
        type="circle"
        percent={percent}
        format={() => `${countdown}`}
        strokeColor={colorLight.mainBtnColor}
      />
    </div>
  );
}

function SelectCoinPanel() {
  const coins = [
    { value: 'BTC/KRW', label: '비트코인' },
    { value: 'SXP/KRW', label: '솔라' },
    { value: 'SUI/KRW', label: '수이' },
    { value: 'ARK/KRW', label: '아크' },
    { value: 'SHIB/KRW', label: '시바이누' },
    { value: 'SEI/KRW', label: '세이' },
    { value: 'HIFI/KRW', label: '하이파이' },
    { value: 'XRP/KRW', label: '리플' },
    { value: 'UXLINK/KRW', label: '유엑스링크' },
  ];
  // 시작 카운트다운
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const loadingTimer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(loadingTimer);
    }, 5000);

    return () => clearInterval(loadingTimer);
  }, []);

  // 토글 select
  const [selectedCoins, setSelectedCoins] = useState<number[]>([]);

  const toggleCoinSelection = (coinIndex: number) => {
    setSelectedCoins((prevSelected) => {
      if (prevSelected.includes(coinIndex)) {
        return prevSelected.filter((index) => index !== coinIndex);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, coinIndex];
      }
      return prevSelected;
    });
  };

  const isMaxSelected = selectedCoins.length === 3;

  const handleNextClick = () => {
    if (isMaxSelected) {
      // 다음 단계로 이동하는 로직을 여기에 추가
      console.log('다음 단계로 이동');
    }
  };

  return (
    <div css={containerCss}>
      {countdown > 0 && <Overlay countdown={countdown} />}
      <div css={titleTextCss}>
        9개의 비트코인 종목 중에서, 가장 유망해 보이는 3개의 그래프를 골라주세요.
      </div>
      <div css={progressBoxCss}>
        <div css={progressCss(countdown)}></div>
      </div>
      <div css={chartContainerCss}>
        {coins.map((coin, index) => {
          const isSelected = selectedCoins.includes(index);
          const isDisabled = !isSelected && isMaxSelected;

          return (
            <div key={index} css={coinItemCss}>
              <div css={coinTitleCss(isSelected)} onClick={() => toggleCoinSelection(index)}>
                {coin.label} {coin.value}
                <Button css={selectButtonCss(isSelected, isDisabled)} disabled={isDisabled}>
                  {isSelected ? '해제' : '선택'}
                </Button>
              </div>
              <BtcKRW coin={coin.value} />
            </div>
          );
        })}
      </div>
      <div css={seleteInfoBoxCss}>
        선택한 종목: {selectedCoins.map((index) => coins[index].label).join(', ')}
      </div>
      <div css={buttonContainerCss}>
        <Button css={recommendCss}>AI 추천</Button>
        <Button css={nextBtnCss(isMaxSelected)} onClick={handleNextClick} disabled={!isMaxSelected}>
          다음
        </Button>
      </div>
    </div>
  );
}

export { SelectCoinPanel };
