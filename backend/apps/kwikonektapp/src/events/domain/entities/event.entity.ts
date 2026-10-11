export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
