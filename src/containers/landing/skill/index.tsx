import { useState } from 'react';
import {
  SkillContainer,
  ContentWrapper,
  FeatureCard,
  FeatureTitle,
  TabsContainer,
  Tab,
  TabIndicator,
  FeatureDescription,
  TabletImage,
} from './style';

const SkillLanding = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: '자습관리',
      description:
        'AI를 활용하여 선생님들의 일정과 학교 일정을 반영한 자습 감독 자동 배정 기능입니다.\n필요한 경우, 자습 감독 관리 선생님께서 수동으로 수정할 수도 있습니다.',
      images: [
        { src: '/assets/manage.svg', position: 'left' },
        { src: '/assets/record.svg', position: 'right' },
      ],
    },
    {
      title: '자습감독 자동배정',
      description:
        'AI를 활용하여 선생님들의 일정과 학교 일정을 반영한 자습 감독 자동 배정 기능입니다.\n필요한 경우, 자습 감독 관리 선생님께서 수동으로 수정할 수도 있습니다.',
      images: [
        { src: '/assets/supervisionSchedule.svg', position: 'left' },
        { src: '/assets/createSupervisionSchedule.svg', position: 'right' },
      ],
    },
    {
      title: '학생이석 관리',
      description:
        '학생들의 이석 현황을 실시간으로 확인하고 관리할 수 있는 기능입니다.\n자습 감독 선생님께서 편리하게 학생 상태를 확인하고 기록할 수 있습니다.',
      images: [
        { src: '/assets/writeMovement.svg', position: 'left' },
        { src: '/assets/recordMovement.svg', position: 'right' },
      ],
    },
  ];

  return (
    <SkillContainer>
        {features[activeTab].images.map((image, index) => (
          <TabletImage
            key={index}
            src={image.src}
            alt={`${features[activeTab].title} ${index + 1}`}
            position={image.position as 'left' | 'right'}
            activeTab={activeTab}
          />
        ))}
      <ContentWrapper>
        <FeatureCard>
          <FeatureTitle>기능설명</FeatureTitle>
          <TabsContainer>
            <TabIndicator activeIndex={activeTab} />
            {features.map((feature, index) => (
              <Tab
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {feature.title}
              </Tab>
            ))}
          </TabsContainer>
          <FeatureDescription>{features[activeTab].description}</FeatureDescription>
        </FeatureCard>
      </ContentWrapper>
    </SkillContainer>
  );
};

export default SkillLanding;
