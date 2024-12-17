package models

import "time"

type Guest struct {
	ID          uint      `json:"id"`
	FirstName   string    `json:"first_name"`
	LastName    string    `json:"last_name"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	Address     string    `json:"address"`
	City        string    `json:"city"`
	Country     string    `json:"country"`
	IDType      string    `json:"id_type"`
	IDNumber    string    `json:"id_number"`
	Notes       string    `json:"notes"`
	VIP         bool      `json:"vip"`
	Preferences string    `json:"preferences"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type GuestRequest struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	Address     string `json:"address"`
	City        string `json:"city"`
	Country     string `json:"country"`
	IDType      string `json:"id_type"`
	IDNumber    string `json:"id_number"`
	Notes       string `json:"notes"`
	Preferences string `json:"preferences"`
}
