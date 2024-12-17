package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"hotel-pms/backend/internal/models"

	"github.com/gorilla/mux"
)

type GuestHandler struct {
	guests []models.Guest
}

func NewGuestHandler() *GuestHandler {
	h := &GuestHandler{}
	h.initializeSampleData()
	return h
}

func (h *GuestHandler) initializeSampleData() {
	h.guests = []models.Guest{
		{
			ID: 1, FirstName: "John", LastName: "Doe",
			Email: "john@example.com", Phone: "123-456-7890",
			Address: "123 Main St", City: "New York", Country: "USA",
			IDType: "passport", IDNumber: "AB123456",
			VIP: true, Preferences: "Non-smoking, High floor",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 2, FirstName: "Jane", LastName: "Smith",
			Email: "jane@example.com", Phone: "098-765-4321",
			Address: "456 Park Ave", City: "London", Country: "UK",
			IDType: "national_id", IDNumber: "XY987654",
			Notes: "Regular business traveler",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
		{
			ID: 3, FirstName: "Alice", LastName: "Johnson",
			Email: "alice@example.com", Phone: "555-0123-4567",
			Address: "789 Beach Rd", City: "Sydney", Country: "Australia",
			IDType: "drivers_license", IDNumber: "DL456789",
			Preferences: "Ocean view, King bed",
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
	}
}

func (h *GuestHandler) ListGuests(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"guests": h.guests,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func (h *GuestHandler) GetGuest(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid guest ID", http.StatusBadRequest)
		return
	}

	for _, guest := range h.guests {
		if guest.ID == uint(id) {
			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"data": map[string]interface{}{
					"guest": guest,
				},
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Guest not found", http.StatusNotFound)
}

func (h *GuestHandler) CreateGuest(w http.ResponseWriter, r *http.Request) {
	var req models.GuestRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	newGuest := models.Guest{
		ID:          uint(len(h.guests) + 1),
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		Email:       req.Email,
		Phone:       req.Phone,
		Address:     req.Address,
		City:        req.City,
		Country:     req.Country,
		IDType:      req.IDType,
		IDNumber:    req.IDNumber,
		Notes:       req.Notes,
		Preferences: req.Preferences,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	h.guests = append(h.guests, newGuest)

	w.Header().Set("Content-Type", "application/json")
	response := map[string]interface{}{
		"status": "success",
		"data": map[string]interface{}{
			"guest": newGuest,
		},
	}
	json.NewEncoder(w).Encode(response)
}

func (h *GuestHandler) UpdateGuest(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, "Invalid guest ID", http.StatusBadRequest)
		return
	}

	var req models.GuestRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	for i := range h.guests {
		if h.guests[i].ID == uint(id) {
			h.guests[i].FirstName = req.FirstName
			h.guests[i].LastName = req.LastName
			h.guests[i].Email = req.Email
			h.guests[i].Phone = req.Phone
			h.guests[i].Address = req.Address
			h.guests[i].City = req.City
			h.guests[i].Country = req.Country
			h.guests[i].IDType = req.IDType
			h.guests[i].IDNumber = req.IDNumber
			h.guests[i].Notes = req.Notes
			h.guests[i].Preferences = req.Preferences
			h.guests[i].UpdatedAt = time.Now()

			w.Header().Set("Content-Type", "application/json")
			response := map[string]interface{}{
				"status": "success",
				"data": map[string]interface{}{
					"guest": h.guests[i],
				},
			}
			json.NewEncoder(w).Encode(response)
			return
		}
	}

	http.Error(w, "Guest not found", http.StatusNotFound)
}
