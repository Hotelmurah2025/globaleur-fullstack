package models

import "time"

type Booking struct {
	ID            uint      `json:"id"`
	GuestID       uint      `json:"guest_id"`
	Guest         Guest     `json:"guest"`
	RoomID        uint      `json:"room_id"`
	Room          Room      `json:"room"`
	CheckInDate   time.Time `json:"check_in_date"`
	CheckOutDate  time.Time `json:"check_out_date"`
	Status        string    `json:"status"` // confirmed, checked_in, checked_out, cancelled
	TotalAmount   float64   `json:"total_amount"`
	Notes         string    `json:"notes"`
	PaymentStatus string    `json:"payment_status"` // pending, paid, refunded
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type BookingRequest struct {
	GuestID      uint      `json:"guest_id"`
	RoomID       uint      `json:"room_id"`
	CheckInDate  time.Time `json:"check_in_date"`
	CheckOutDate time.Time `json:"check_out_date"`
	Status       string    `json:"status"` // confirmed, checked_in, checked_out, cancelled
	Notes        string    `json:"notes"`
}
