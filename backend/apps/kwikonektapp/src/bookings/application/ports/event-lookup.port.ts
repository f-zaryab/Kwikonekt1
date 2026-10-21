export type BookableEvent = {
  id: string;
  title: string;
  durationMinutes: number;
  isActive: boolean;
  userId: string;
};

export abstract class EventLookupPort {
  abstract findById(eventId: string): Promise<BookableEvent | null>;
}
