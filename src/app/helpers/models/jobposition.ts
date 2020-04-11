export interface jobPosition {
  id: number;
  name: string;
  description: string;
  department_id: {
    id: number;
    name: string;
    desc: string;
  };
}
