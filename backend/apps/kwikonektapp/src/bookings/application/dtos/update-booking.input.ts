import {
  BookingStatus,
  ParticipationStatus,
} from '../../domain/entities/booking.entity';

export type UpdateBookingGuestDetailsInput = {
  guestName?: string;
  guestEmail?: string;
};

export type UpdateBookingSchedule = {
  startTime: Date;
};

export type UpdateBookingStatus = {
  status: BookingStatus;
};

export type UpdateBookingGuestAttendenceStatus = {
  guestAttendanceStatus: ParticipationStatus;
};

export type UpdateBookingHostAttendenceStatus = {
  hostAttendanceStatus: ParticipationStatus;
};

export type UpdateBookingMeetingLink = {
  meetingLink: string;
};
