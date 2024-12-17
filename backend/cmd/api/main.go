package main

import (
	"encoding/json"
	"log"
	"net/http"
	"hotel-pms/backend/internal/handlers"
	"hotel-pms/backend/internal/middleware"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func main() {
	r := mux.NewRouter()

	// Initialize handlers
	roomHandler := handlers.NewRoomHandler()
	bookingHandler := handlers.NewBookingHandler()
	guestHandler := handlers.NewGuestHandler()

	// Apply middleware
	r.Use(middleware.ErrorHandler)

	// Room routes
	r.HandleFunc("/api/rooms", roomHandler.ListRooms).Methods("GET")
	r.HandleFunc("/api/rooms/{id}", roomHandler.GetRoom).Methods("GET")
	r.HandleFunc("/api/rooms", roomHandler.CreateRoom).Methods("POST")
	r.HandleFunc("/api/rooms/{id}", roomHandler.UpdateRoom).Methods("PUT")
	r.HandleFunc("/api/rooms/{id}", roomHandler.DeleteRoom).Methods("DELETE")

	// Booking routes
	r.HandleFunc("/api/bookings", bookingHandler.ListBookings).Methods("GET")
	r.HandleFunc("/api/bookings/{id}", bookingHandler.GetBooking).Methods("GET")
	r.HandleFunc("/api/bookings", bookingHandler.CreateBooking).Methods("POST")
	r.HandleFunc("/api/bookings/{id}/check-in", bookingHandler.CheckIn).Methods("POST")
	r.HandleFunc("/api/bookings/{id}/check-out", bookingHandler.CheckOut).Methods("POST")

	// Guest routes
	r.HandleFunc("/api/guests", guestHandler.ListGuests).Methods("GET")
	r.HandleFunc("/api/guests/{id}", guestHandler.GetGuest).Methods("GET")
	r.HandleFunc("/api/guests", guestHandler.CreateGuest).Methods("POST")
	r.HandleFunc("/api/guests/{id}", guestHandler.UpdateGuest).Methods("PUT")

	// Health check endpoint
	r.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(Response{Status: "success", Message: "API is running"})
	}).Methods("GET")

	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Update this in production
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Authorization", "Content-Type"},
	})

	// Create server
	srv := &http.Server{
		Addr:    ":8000",
		Handler: c.Handler(r),
	}

	log.Printf("Starting server on port 8000")
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
