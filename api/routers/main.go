package routers

import (
	"database/sql"
	"log"

	"github.com/gorilla/mux"
	"github.com/kuwabuga/pokemon-api/middlewares"
)

func New(l *log.Logger, db *sql.DB) *mux.Router {
	r := mux.NewRouter()
	pokemonRoutes(l, db, r)
	r.Use(middlewares.Json)
	return r
}
