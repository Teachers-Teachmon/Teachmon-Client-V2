import styled from '@emotion/styled';
import { mq } from '@/styles/media';
import { colors, fontSizes } from '@/styles/theme';

export const SupervisorSection = styled.div`
  width: 480px;
  flex-shrink: 0;
  background-color: ${colors.background};
  border: 1px solid ${colors.n02};
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
  color: ${colors.text};
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
  background-color: ${colors.primaryBackground};
  border: 1px solid ${colors.n02};
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.mobile} {
    height: 70px;
  }
`;

export const TeacherName = styled.span<{ $isEmpty?: boolean }>`
  font-family: 'Paperlogy', sans-serif;
  font-weight: ${({ $isEmpty }) => ($isEmpty ? 400 : 600)};
  font-size: ${({ $isEmpty }) => ($isEmpty ? '14px' : '18px')};
  line-height: 22px;
  color: ${({ $isEmpty }) => ($isEmpty ? '#9ca4ba' : '#000000')};
  margin-top: 10px;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
    line-height: 18px;
    margin-top: 8px;
  }
`;

export const TeacherCount = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 600;
  font-size: ${fontSizes.Small};
  line-height: 17px;
  color: ${colors.primaryGray};
  margin-top: 6px;

  ${mq.mobile} {
    font-size: ${fontSizes.Caption};
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
    max-height: ${({ $showAll }) => ($showAll ? '150px' : '0')};
    overflow: hidden;
    opacity: ${({ $showAll }) => ($showAll ? '1' : '0')};
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
`;

export const RankingRow = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid ${colors.n02};

  ${mq.mobile} {
    padding: 12px 16px;
  }
`;

export const RankNumber = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: ${fontSizes.Body};
  line-height: 20px;
  color: ${colors.text};
  min-width: 45px;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
    line-height: 18px;
    min-width: 40px;
  }
`;

export const RankName = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${colors.text};
  flex: 1;

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
    line-height: 17px;
  }
`;

export const RankCount = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${colors.text};

  ${mq.mobile} {
    font-size: ${fontSizes.Small};
    line-height: 17px;
  }
`;
export const ShowMoreButton = styled.button`
  display: none;

  ${mq.mobile} {
    display: block;
    width: 100%;
    padding: 12px;
    background-color: ${colors.primaryBackground};
    border: none;
    border-top: 1px solid ${colors.n02};
    font-family: 'Paperlogy', sans-serif;
    font-weight: 600;
    font-size: ${fontSizes.Small};
    color: ${colors.primary};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${colors.primary100};
    }
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-family: 'Paperlogy', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #9ca4ba;
  padding: 40px 20px;
`;
