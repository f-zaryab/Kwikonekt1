export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export type ParticipationStatus =
  'AWAITING_RESPONSE' | 'ATTENDING' | 'NOT_ATTENDING';

export type Booking = {
  id: string;
  slug: string;
  title: string;
  meetingLink: string | null;
  guestName: string;
  guestEmail: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  guestAttendanceStatus: ParticipationStatus;
  hostAttendanceStatus: ParticipationStatus;
  createdAt: Date;
  updatedAt: Date;
  // foreign
  eventId: string;
  hostId: string;
};
