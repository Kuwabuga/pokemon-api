package pokemon

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Handler struct {
	l *log.Logger
	s *Service
}

func NewHandler(l *log.Logger, s *Service) *Handler {
	return &Handler{l, s}
}

func (h *Handler) HandleFind(rw http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	dexNo := params["dexNo"]
	pokemon, err := h.s.FindByDexNumber(dexNo)
	if err != nil {
		h.l.Println(err)
		http.Error(rw, "Could not find pokemon", http.StatusNotFound)
		return
	}

	e := json.NewEncoder(rw)
	err = e.Encode(pokemon)
	if err != nil {
		h.l.Println(err)
		http.Error(rw, "Could not build response", http.StatusInternalServerError)
	}
}

func (h *Handler) HandleFindAll(rw http.ResponseWriter, r *http.Request) {
}
