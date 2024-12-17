# Hotel PMS API Documentation

## Core Endpoints

### Rooms
- `GET /api/rooms` - List all rooms
- `GET /api/rooms/{id}` - Get room details
- `POST /api/rooms` - Create new room
- `PUT /api/rooms/{id}` - Update room details
- `DELETE /api/rooms/{id}` - Delete room

### Bookings
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/{id}` - Get booking details
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking
- `GET /api/bookings/room/{roomId}` - Get bookings for specific room

### Guests
- `GET /api/guests` - List all guests
- `GET /api/guests/{id}` - Get guest details
- `POST /api/guests` - Register new guest
- `PUT /api/guests/{id}` - Update guest information
- `GET /api/guests/{id}/bookings` - Get guest's booking history

### Room Types
- `GET /api/room-types` - List all room types
- `GET /api/room-types/{id}` - Get room type details
- `POST /api/room-types` - Create new room type
- `PUT /api/room-types/{id}` - Update room type

### Availability
- `GET /api/availability` - Check room availability
- `GET /api/availability/{roomId}` - Check specific room availability

### Check-in/Check-out
- `POST /api/bookings/{id}/check-in` - Process guest check-in
- `POST /api/bookings/{id}/check-out` - Process guest check-out

## Data Models

### Room
```go
type Room struct {
    ID          uint      `json:"id"`
    Number      string    `json:"number"`
    TypeID      uint      `json:"type_id"`
    Status      string    `json:"status"` // available, occupied, maintenance
    Floor       int       `json:"floor"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}
```

### Booking
```go
type Booking struct {
    ID            uint      `json:"id"`
    GuestID       uint      `json:"guest_id"`
    RoomID        uint      `json:"room_id"`
    CheckInDate   time.Time `json:"check_in_date"`
    CheckOutDate  time.Time `json:"check_out_date"`
    Status        string    `json:"status"` // confirmed, checked_in, checked_out, cancelled
    TotalAmount   float64   `json:"total_amount"`
    CreatedAt     time.Time `json:"created_at"`
    UpdatedAt     time.Time `json:"updated_at"`
}
```

### Guest
```go
type Guest struct {
    ID           uint      `json:"id"`
    FirstName    string    `json:"first_name"`
    LastName     string    `json:"last_name"`
    Email        string    `json:"email"`
    Phone        string    `json:"phone"`
    Address      string    `json:"address"`
    IDNumber     string    `json:"id_number"`
    CreatedAt    time.Time `json:"created_at"`
    UpdatedAt    time.Time `json:"updated_at"`
}
```

### RoomType
```go
type RoomType struct {
    ID          uint      `json:"id"`
    Name        string    `json:"name"`
    Description string    `json:"description"`
    Capacity    int       `json:"capacity"`
    Rate        float64   `json:"rate"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}
```
