import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEmail,
  IsUUID,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  guestName!: string;

  @IsEmail()
  guestEmail!: string;

  @IsDateString({ strict: true })
  startTime!: string;

  @IsUUID()
  eventId!: string;
}
