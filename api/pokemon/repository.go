package pokemon

import (
	"database/sql"
	"log"
)

type Repository struct {
	l  *log.Logger
	db *sql.DB
}

func NewRepository(l *log.Logger, db *sql.DB) *Repository {
	return &Repository{l, db}
}
