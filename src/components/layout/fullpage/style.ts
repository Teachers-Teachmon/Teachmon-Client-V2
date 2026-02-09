import styled from '@emotion/styled';
import { mq } from '@/styles/media';

interface FullPageWrapperProps {
  hasHeader?: boolean;
}

export const FullPageWrapper = styled.div<FullPageWrapperProps>`
  width: 100%;
  ${props => props.hasHeader ? `
    height: calc(100vh - 80px);
    
    ${mq.mobile} {
      height: calc(100vh - 60px);
    }
    ` : `
      height: 100vh;
    `}
  #fullpage {
    .section {
      transition: background-color 0.5s ease;
      ${props => props.hasHeader && `
        margin-top: 80px;
        
        ${mq.mobile} {
          margin-top: 60px;
        }
      `}
    }
      .fp-table{
        ${props => props.hasHeader && `
          display: block;
        `}
  }

  /* fullpage.js 워터마크 숨기기 */
  .fp-watermark {
    display: none !important;
  }

  /* 하드웨어 가속 적용 */
  .fp-section {
    transform: translate3d(0, 0, 0);
  }

  /* 네비게이션 커스터마이징 */
  #fp-nav {
    display: none !important;
  }
`;
