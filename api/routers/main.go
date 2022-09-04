package routers

import (
	"database/sql"
	"log"

	"github.com/gorilla/mux"
	"github.com/kuwabuga/pokemon-api/middlewares"
)

func New(l *log.Logger, db *sql.DB) *mux.Router {
	r := mux.NewRouter()
	r.Use(middlewares.Json)

	router := r.PathPrefix("/api").Subrouter()
	pokemonRoutes(l, db, router)
	return r
}
