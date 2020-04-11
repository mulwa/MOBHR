export interface Leave {
  id: number;
  request_from: number;
  employee_name: string;
  explanation: string;
  leave_date: string;
  approved: boolean;
  leave_type: number;
  leave_type_name: string;
}
