// 나중에 지월질 목데이터입니다.
import { USER_ROLES } from '@/constants/admin';
import type { Teacher } from './index';

export const mockTeachers: Teacher[] = [
  { id: '1', role: USER_ROLES.ADMIN, name: '이혜정', email: 'teacher068@bssm.hs.kr', supervisionCount: 36 },
  { id: '2', role: USER_ROLES.NORMAL, name: '이혜정', email: 'teacher068@bssm.hs.kr', supervisionCount: 36 },
];
