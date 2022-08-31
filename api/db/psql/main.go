package psql

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"

	"github.com/kuwabuga/pokemon-api/config"
)

func Connect(config *config.Config) (*sql.DB, error) {
	return sql.Open("postgres", buildConnectionURL(config))
}

func buildConnectionURL(config *config.Config) string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.DbHost, config.DbPort, config.DbUser, config.DbPassword, config.DbName)

}
