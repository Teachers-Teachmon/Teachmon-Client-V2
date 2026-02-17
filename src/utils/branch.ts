interface BranchInfo {
  number: number;
  start_day: string;
  end_day: string;
}

export const findCurrentQuarter = (branchInfo: BranchInfo[]): BranchInfo | undefined => {
  return branchInfo?.find(q => {
    const currentDate = new Date();
    const startDate = new Date(q.start_day);
    const endDate = new Date(q.end_day);
    
    return currentDate >= startDate && currentDate <= endDate;
  });
};
