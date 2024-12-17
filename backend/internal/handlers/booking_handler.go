package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"hotel-pms/backend/internal/models"

	"github.com/gorilla/mux"
)

type BookingHandler struct {
	bookings []models.Booking
	rooms    []models.Room
	guests   []models.Guest
}

func NewBookingHandler() *BookingHandler {
	h := &BookingHandler{}
	h.initializeSampleData()
	return h
}

func (h *BookingHandler) initializeSampleData() {
	// Sample guests
	h.guests = []models.Guest{
		{
			ID: 1, FirstName: "John", LastName: "Doe",
			Email: "john@example.com", Phone: "123-456-7890",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 2, FirstName: "Jane", LastName: "Smith",
			Email: "jane@example.com", Phone: "098-765-4321",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
	}

	// Sample rooms (simplified version of RoomHandler's rooms)
	h.rooms = []models.Room{
		{
			ID: 1, Number: "101", TypeID: 1,
			Status: "occupied", Floor: 1,
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 2, Number: "102", TypeID: 1,
			Status: "available", Floor: 1,
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
	}

	// Sample bookings
	checkIn := time.Now()
	checkOut := checkIn.Add(24 * 2 * time.Hour) // 2 days stay
	h.bookings = []models.Booking{
		{
			ID: 1, GuestID: 1, Guest: h.guests[0],
			RoomID: 1, Room: h.rooms[0],
			CheckInDate: checkIn, CheckOutDate: checkOut,
			Status: "checked_in", TotalAmount: 200.00,
			PaymentStatus: "paid",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 2, GuestID: 2, Guest: h.guests[1],
			RoomID: 2, Room: h.rooms[1],
			CheckInDate: checkIn.Add(24 * time.Hour),
			CheckOutDate: checkOut.Add(24 * time.Hour),
			Status: "confirmed", TotalAmount: 150.00,
			PaymentStatus: "pending",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
	}
}

func (h *BookingHandler) ListBookings(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"bookings": h.bookings,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func (h *BookingHandler) GetBooking(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid booking ID", http.StatusBadRequest)
		return
	}

	for _, booking := range h.bookings {
		if booking.ID == uint(id) {
			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"data": map[string]interface{}{
					"booking": booking,
				},
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Booking not found", http.StatusNotFound)
}

func (h *BookingHandler) CreateBooking(w http.ResponseWriter, r *http.Request) {
	var req models.BookingRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate room exists
	roomExists := false
	for _, room := range h.rooms {
		if room.ID == req.RoomID {
			roomExists = true
			break
		}
	}
	if !roomExists {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	// Validate guest exists
	guestExists := false
	for _, guest := range h.guests {
		if guest.ID == req.GuestID {
			guestExists = true
			break
		}
	}
	if !guestExists {
		http.Error(w, "Guest not found", http.StatusNotFound)
		return
	}

	// Create new booking
	newBooking := models.Booking{
		ID:            uint(len(h.bookings) + 1),
		GuestID:       req.GuestID,
		RoomID:        req.RoomID,
		CheckInDate:   req.CheckInDate,
		CheckOutDate:  req.CheckOutDate,
		Status:        req.Status,
		TotalAmount:   150.00, // Sample amount
		PaymentStatus: "pending",
		Notes:         req.Notes,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	h.bookings = append(h.bookings, newBooking)

	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"booking": newBooking,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func (h *BookingHandler) UpdateBookingStatus(w http.ResponseWriter, r *http.Request, newStatus string) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid booking ID", http.StatusBadRequest)
		return
	}

	for i := range h.bookings {
		if h.bookings[i].ID == uint(id) {
			h.bookings[i].Status = newStatus
			h.bookings[i].UpdatedAt = time.Now()

			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"data": map[string]interface{}{
					"booking": h.bookings[i],
				},
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Booking not found", http.StatusNotFound)
}

func (h *BookingHandler) CheckIn(w http.ResponseWriter, r *http.Request) {
	h.UpdateBookingStatus(w, r, "checked_in")
}

func (h *BookingHandler) CheckOut(w http.ResponseWriter, r *http.Request) {
	h.UpdateBookingStatus(w, r, "checked_out")
}
