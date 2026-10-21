import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsUrl,
} from 'class-validator';
import type {
  BookingStatus,
  ParticipationStatus,
} from '../../domain/entities/booking.entity';

export class UpdateBookingGuestDetailsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  guestName?: string;

  @IsOptional()
  @IsEmail()
  guestEmail?: string;
}

export class UpdateBookingRescheduleDto {
  @IsDateString({ strict: true })
  startTime!: string;
}

export class UpdateBookingStatusDto {
  @IsIn(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
  status!: BookingStatus;
}

export class UpdateBookingHostAttendenceStatusDto {
  @IsIn(['AWAITING_RESPONSE', 'ATTENDING', 'NOT_ATTENDING'])
  hostAttendanceStatus!: ParticipationStatus;
}

export class UpdateBookingGuestAttendenceStatusDto {
  @IsIn(['AWAITING_RESPONSE', 'ATTENDING', 'NOT_ATTENDING'])
  guestAttendanceStatus!: ParticipationStatus;
}

export class UpdateBookingMeetingLinkDto {
  @IsUrl({
    protocols: ['https'],
    require_protocol: true,
  })
  meetingLink!: string;
}
