import axiosInstance from '@/lib/axiosInstance';

export interface BranchRequest {
  number: number;
  start_day: string;
  end_day: string;
}

export interface BranchResponse {
  number: number;
  start_day: string;
  end_day: string;
}

export const createBranch = async (branchData: BranchRequest) => {
  const { data } = await axiosInstance.post('/branch', branchData);
  return data;
};

export const getBranchList = async () => {
  const { data } = await axiosInstance.get<BranchResponse[]>('/branch');
  return data;
};
