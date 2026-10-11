export type CreateEventInput = {
  slug: string;
  title: string;
  description?: string;
  durationMinutes?: number;
  isActive?: boolean;
  userId: string;
};
