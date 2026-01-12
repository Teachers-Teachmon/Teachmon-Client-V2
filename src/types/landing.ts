export interface CardData {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

export interface RoleSlide {
  title: string;
  description: string;
  image: string;
}

export interface SkillFeature {
  title: string;
  description: string;
  images: {
    src: string;
    position: 'left' | 'right';
  }[];
}
