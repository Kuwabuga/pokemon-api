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
	return Pokemon{}, nil
}
