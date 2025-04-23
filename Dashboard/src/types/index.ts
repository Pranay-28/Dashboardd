export interface Widget {
  id: string;
  name: string;
  content: string;
  type?: string;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}