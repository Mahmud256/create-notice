export interface Notice {
  _id: string;
  title: string;
  noticeType: "General" | "HR" | "Emergency";
  department: string;
  employeeId: string;
  employeeName: string;
  position: string;
  publishDate: string;
  body?: string;
  attachments?: {
    fileName: string;
    fileUrl: string;
  }[];
  status: "Published" | "Draft";
  createdAt: string;
  updatedAt: string;
}
