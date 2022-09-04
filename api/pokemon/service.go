package pokemon

import (
	"log"
)

type Service struct {
	l    *log.Logger
	repo *Repository
}

func NewService(l *log.Logger, repo *Repository) *Service {
	return &Service{l, repo}
}

func (s *Service) FindByDexNumber(dexNo string) (Pokemon, error) {
	return Pokemon{
		NationalDexNo:  "#001",
		Name:           "Bulbasaur",
		Gender:         []string{"Male"},
		Generation:     "I",
		Type:           []string{"Grass"},
		Classification: "Seed Pokémon",
		BaseStats: Stats{
			HP:        45,
			Attack:    49,
			Defense:   49,
			SpAttack:  65,
			SpDefense: 65,
			Speed:     45,
		},
		Height: Height{
			Meters: 0.7,
			Feet:   2.04,
		},
		Weight: Weight{
			Kilograms: 6.9,
			Pounds:    15.2,
		},
	}, nil
}
