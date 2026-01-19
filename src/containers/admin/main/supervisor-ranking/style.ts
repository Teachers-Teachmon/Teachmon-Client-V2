import styled from '@emotion/styled';
import { mq } from '@/styles/media';

export const SupervisorSection = styled.div`
  width: 480px;
  flex-shrink: 0;
  background-color: #ffffff;
  border: 1px solid #f2f3f6;
  border-radius: 16px;
  width:100%;
  padding: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${mq.mobile} {
    min-height: auto;
    overflow: visible;
  }
`;
export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px 0 28px;
  margin-bottom: 14px;

  ${mq.mobile} {
    padding: 16px 16px 0 16px;
    margin-bottom: 12px;
  }
`;
export const SectionTitle = styled.h2`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  color: #000000;
  margin: 0;

  ${mq.mobile} {
    font-size: 18px;
    line-height: 22px;
  }
`;
export const TopThreeContainer = styled.div`
  display: flex;
  gap: 14px;
  padding: 0 20px;
  margin-top: 14px;
  margin-bottom: 14px;

  ${mq.mobile} {
    padding: 0 16px;
    gap: 10px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;
export const TopRankCard = styled.div<{ $isFirst?: boolean }>`
  width: 100%;
  background-color: #fbfcff;
  border: 1px solid #f2f3f6;
  border-radius: 8px;
  padding: 0 0 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: ${({ $isFirst }) => ($isFirst ? '-16px' : '0')};

  ${mq.mobile} {
    padding: 0 0 8px 0;
  }
`;
export const RankBadge = styled.div`
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 38px;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${mq.mobile} {
    width: 28px;
    height: 30px;
    top: -18px;
  }
`;
export const TeacherImage = styled.div`
  width: 100%;
  height: 90px;
  background: linear-gradient(135deg, #e8f0fe 0%, #f5f8ff 100%);
  border-radius: 8px 8px 0 0;

  ${mq.mobile} {
    height: 70px;
  }
`;
export const TeacherName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin-top: 10px;

  ${mq.mobile} {
    font-size: 14px;
    line-height: 18px;
    margin-top: 8px;
  }
`;
export const TeacherCount = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #9ca4ba;
  margin-top: 6px;

  ${mq.mobile} {
    font-size: 12px;
    line-height: 15px;
    margin-top: 4px;
  }
`;
export const RankingList = styled.div<{ $showAll?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  min-height: 0;

  ${mq.mobile} {
    display: ${({ $showAll }) => ($showAll ? 'flex' : 'none')};
    max-height: ${({ $showAll }) => ($showAll ? '150px' : '0')};
    overflow-y: auto;
  }
`;
export const RankingRow = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #f2f3f6;

  ${mq.mobile} {
    padding: 12px 16px;
  }
`;
export const RankNumber = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  min-width: 45px;

  ${mq.mobile} {
    font-size: 14px;
    line-height: 18px;
    min-width: 40px;
  }
`;
export const RankName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
  flex: 1;

  ${mq.mobile} {
    font-size: 14px;
    line-height: 17px;
  }
`;
export const RankCount = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #000000;

  ${mq.mobile} {
    font-size: 14px;
    line-height: 17px;
  }
`;
export const ShowMoreButton = styled.button`
  display: none;

  ${mq.mobile} {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: #fbfcff;
    border: none;
    border-top: 1px solid #f2f3f6;
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #2e6ff2;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f8ff;
    }
  }
`;
