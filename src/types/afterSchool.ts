export interface AffordableReinforcement {
    day: string;
    start_period: number;
    end_period: number;
}

export interface PlaceSearchResult {
    id: string | number;
    name: string;
    floor: number;
}

export interface AdminAfterSchoolClass {
    id: string;
    grade: 1 | 2 | 3;
    day: string;
    period: string;
    teacher: string;
    location: string;
    subject: string;
    students: string[];
}

export interface TableColumn<T> {
  key: string;
  header: string | React.ReactNode;
  width?: string;
  render?: (row: T) => React.ReactNode;
}
