import { getAfterSchoolClasses } from './afterSchool.api';
import type { AfterSchoolRequestParams, AfterSchoolResponse } from '@/types/afterSchool';

export const afterSchoolQuery = {
  classes: (params: AfterSchoolRequestParams) => ({
    queryKey: ['afterSchool', 'classes', params],
    queryFn: () => getAfterSchoolClasses(params),
    select: (data: AfterSchoolResponse[]) => data,
  }),
};
