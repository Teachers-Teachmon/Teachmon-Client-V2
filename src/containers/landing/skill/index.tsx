import { useState } from 'react';
import { SKILL_FEATURES } from '@/constants/landing';
import * as S from './style';

const SkillLanding = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = SKILL_FEATURES;

  return (
    <S.SkillContainer>
        {features[activeTab].images.map((image, index) => (
          <S.TabletImage
            key={index}
            src={image.src}
            alt={`${features[activeTab].title} ${index + 1}`}
            position={image.position as 'left' | 'right'}
            activeTab={activeTab}
          />
        ))}
      <S.ContentWrapper>
        <S.FeatureCard>
          <S.FeatureTitle>기능설명</S.FeatureTitle>
          <S.TabsContainer>
            <S.TabIndicator activeIndex={activeTab} />
            {features.map((feature, index) => (
              <S.Tab
                key={index}
                active={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                {feature.title}
              </S.Tab>
            ))}
          </S.TabsContainer>
          <S.FeatureDescription>{features[activeTab].description}</S.FeatureDescription>
        </S.FeatureCard>
      </S.ContentWrapper>
    </S.SkillContainer>
  );
};

export default SkillLanding;
