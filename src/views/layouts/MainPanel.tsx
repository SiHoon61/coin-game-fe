import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

const containerCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const contentCss = css`
  width: 100%;
  height: 100%;
  padding: 10px;
`;

function MainPanel() {
  return (
    <div css={containerCss}>
      <div css={contentCss}>
        <Outlet />
      </div>
    </div>
  );
}

export { MainPanel };
