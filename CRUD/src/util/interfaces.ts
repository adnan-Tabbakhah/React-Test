interface Subject {
  SubjectName: string;
  TeachersNames: string;
  DayTime: string;
}

export interface Users {
  id: number;
  FirstName: string;
  year: string;
  gender: string;
  subjects: Subject[];
}
