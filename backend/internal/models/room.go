package models

import "time"

type Room struct {
	ID          uint      `json:"id"`
	Number      string    `json:"number"`
	TypeID      uint      `json:"type_id"`
	Type        RoomType  `json:"type"`
	Status      string    `json:"status"` // available, occupied, maintenance
	Floor       int       `json:"floor"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type RoomType struct {
	ID          uint        `json:"id"`
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Capacity    int         `json:"capacity"`
	Rate        float64     `json:"rate"`
	Amenities   []Amenity   `json:"amenities"`
	Images      []RoomImage `json:"images"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

type Amenity struct {
	ID          uint      `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Icon        string    `json:"icon"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type RoomImage struct {
	ID        uint      `json:"id"`
	RoomID    uint      `json:"room_id"`
	URL       string    `json:"url"`
	IsPrimary bool      `json:"is_primary"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type RoomRequest struct {
	Number      string `json:"number"`
	TypeID      uint   `json:"type_id"`
	Status      string `json:"status"`
	Floor       int    `json:"floor"`
	Description string `json:"description"`
}
