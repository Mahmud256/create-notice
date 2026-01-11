export interface Notice {
  _id: string;
  title: string;
  type: string;
  department: string;
  status: "Published" | "Unpublished";
  publishedOn: string;
}
