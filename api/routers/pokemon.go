package routers

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/kuwabuga/pokemon-api/pokemon"
)

func pokemonRoutes(l *log.Logger, db *sql.DB, r *mux.Router) {
	pr := pokemon.NewRepository(l, db)
	ps := pokemon.NewService(l, pr)
	ph := pokemon.NewHandler(l, ps)

	getR := r.Methods(http.MethodGet).Subrouter()
	getR.HandleFunc("/pokemon/{dexNo}", ph.HandleFind)
	getR.HandleFunc("/pokemon", ph.HandleFindAll)
}
