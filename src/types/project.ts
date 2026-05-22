export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tagStyle: string;
  cost: string;
  semester: string;
  student: string;
  avatarUrl: string;
  imageUrl: string;
  // Extended fields for detail page
  type?: "physical" | "software";
  category?: string;
  components?: { name: string; price: number }[];
  storeType?: "online" | "local" | "both";
  storeName?: string;
  tools?: string[];
  projectLink?: string;
  uploadedDaysAgo?: number;
}
