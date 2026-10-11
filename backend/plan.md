# Initial Plan

## Model

Event (one-to-many) Booking
User (one-to-many) Event
User (one-to-many) Booking

Events

```
model Event {
  id              String   @id @default(uuid())
  slug            String   @unique
  title           String
  description     String?
  durationMinutes Int      @default(30)
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // User
  userId String
  user   User   @relation(fields: [userId], references: [id])

  // Model
  bookings Booking[]

  @@unique([userId, slug])
}
```

Booking

```
model Booking {
    id                   String              @id @default(uuid())
    slug                 String              @unique
    title                String
    meetingLink          String
    guestName            String
    guestEmail           String
    isStillAttending     ParticipationStatus @default(ATTENDING)
    hostAttendenceStatus ParticipationStatus @default(AWAITING_RESPONSE)
    createdAt            DateTime            @default(now())
    updatedAt            DateTime            @updatedAt

    eventId String
    event   Event  @relation(fields: [eventId], references: [id])
}

enum ParticipationStatus {
    AWAITING_RESPONSE
    ATTENDING
    NOT_ATTENDING
}


```

## API Endpoints
