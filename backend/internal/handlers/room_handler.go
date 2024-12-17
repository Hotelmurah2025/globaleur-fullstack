package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"hotel-pms/backend/internal/models"

	"github.com/gorilla/mux"
)

type RoomHandler struct {
	rooms     []models.Room
	roomTypes []models.RoomType
	amenities []models.Amenity
}

// Initialize sample data
func NewRoomHandler() *RoomHandler {
	h := &RoomHandler{}
	h.initializeSampleData()
	return h
}

func (h *RoomHandler) initializeSampleData() {
	// Sample amenities
	h.amenities = []models.Amenity{
		{ID: 1, Name: "Wi-Fi", Description: "High-speed internet", Icon: "wifi", CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 2, Name: "Air Conditioning", Description: "Climate control", Icon: "wind", CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 3, Name: "Mini Bar", Description: "Stocked mini bar", Icon: "wine", CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 4, Name: "Room Service", Description: "24/7 room service", Icon: "coffee", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	}

	// Sample room types
	h.roomTypes = []models.RoomType{
		{
			ID: 1, Name: "Standard", Description: "Comfortable standard room",
			Capacity: 2, Rate: 100.00,
			Amenities: h.amenities[:2],
			Images:    []models.RoomImage{{ID: 1, URL: "/images/standard.jpg", IsPrimary: true}},
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 2, Name: "Deluxe", Description: "Spacious deluxe room with city view",
			Capacity: 2, Rate: 150.00,
			Amenities: h.amenities[:3],
			Images:    []models.RoomImage{{ID: 2, URL: "/images/deluxe.jpg", IsPrimary: true}},
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 3, Name: "Suite", Description: "Luxury suite with separate living area",
			Capacity: 4, Rate: 250.00,
			Amenities: h.amenities,
			Images:    []models.RoomImage{{ID: 3, URL: "/images/suite.jpg", IsPrimary: true}},
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
	}

	// Sample rooms
	h.rooms = []models.Room{
		{ID: 1, Number: "101", TypeID: 1, Type: h.roomTypes[0], Status: "available", Floor: 1, CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 2, Number: "102", TypeID: 1, Type: h.roomTypes[0], Status: "occupied", Floor: 1, CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 3, Number: "201", TypeID: 2, Type: h.roomTypes[1], Status: "available", Floor: 2, CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 4, Number: "202", TypeID: 2, Type: h.roomTypes[1], Status: "maintenance", Floor: 2, CreatedAt: time.Now(), UpdatedAt: time.Now()},
		{ID: 5, Number: "301", TypeID: 3, Type: h.roomTypes[2], Status: "available", Floor: 3, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	}
}

func (h *RoomHandler) ListRooms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"rooms": h.rooms,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func (h *RoomHandler) GetRoom(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	for _, room := range h.rooms {
		if room.ID == uint(id) {
			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"data": map[string]interface{}{
					"room": room,
				},
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Room not found", http.StatusNotFound)
}

func (h *RoomHandler) CreateRoom(w http.ResponseWriter, r *http.Request) {
	var req models.RoomRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Find room type
	var roomType models.RoomType
	for _, rt := range h.roomTypes {
		if rt.ID == req.TypeID {
			roomType = rt
			break
		}
	}

	if roomType.ID == 0 {
		http.Error(w, "Invalid room type ID", http.StatusBadRequest)
		return
	}

	newRoom := models.Room{
		ID:          uint(len(h.rooms) + 1),
		Number:      req.Number,
		TypeID:      req.TypeID,
		Type:        roomType,
		Status:      req.Status,
		Floor:       req.Floor,
		Description: req.Description,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	h.rooms = append(h.rooms, newRoom)

	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"room": newRoom,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func (h *RoomHandler) UpdateRoom(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	var req models.RoomRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	for i := range h.rooms {
		if h.rooms[i].ID == uint(id) {
			// Find room type if it's being updated
			if req.TypeID != 0 {
				for _, rt := range h.roomTypes {
					if rt.ID == req.TypeID {
						h.rooms[i].Type = rt
						h.rooms[i].TypeID = req.TypeID
						break
					}
				}
			}

			if req.Number != "" {
				h.rooms[i].Number = req.Number
			}
			if req.Status != "" {
				h.rooms[i].Status = req.Status
			}
			if req.Floor != 0 {
				h.rooms[i].Floor = req.Floor
			}
			if req.Description != "" {
				h.rooms[i].Description = req.Description
			}
			h.rooms[i].UpdatedAt = time.Now()

			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"data": map[string]interface{}{
					"room": h.rooms[i],
				},
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Room not found", http.StatusNotFound)
}

func (h *RoomHandler) DeleteRoom(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid room ID", http.StatusBadRequest)
		return
	}

	for i := range h.rooms {
		if h.rooms[i].ID == uint(id) {
			// Remove room from slice
			h.rooms = append(h.rooms[:i], h.rooms[i+1:]...)

			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"message": "Room deleted successfully",
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Room not found", http.StatusNotFound)
}
