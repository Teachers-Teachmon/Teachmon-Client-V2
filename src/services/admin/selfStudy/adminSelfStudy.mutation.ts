import { useMutation } from '@tanstack/react-query';
import type { SelfStudyQuarterlyItem } from '@/types/selfStudy';
import { updateSelfStudyQuarterly } from './adminSelfStudy.api';

export const useUpdateSelfStudyQuarterlyMutation = () =>
  useMutation({
    mutationFn: ({
      params,
      payload,
    }: {
      params: { year: number; branch: number; grade: number };
      payload: SelfStudyQuarterlyItem[];
    }) => updateSelfStudyQuarterly(params, payload),
  });
