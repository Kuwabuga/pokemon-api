package config

import (
	"log"

	"github.com/csothen/env"
)

type Config struct {
	serverConfig
	dbConfig
}

type serverConfig struct {
	BindAddress int
}

type dbConfig struct {
	DbUser     string
	DbPassword string
	DbName     string
	DbHost     string
	DbPort     int
}

func New(l *log.Logger) *Config {
	return &Config{
		serverConfig: serverConfig{
			BindAddress: env.Int("BIND_ADDRESS", 8080),
		},
		dbConfig: dbConfig{
			DbHost:     env.String("DB_HOST", "127.0.0.1"),
			DbPort:     env.Int("DB_PORT", 5432),
			DbName:     env.String("DB_NAME", "test"),
			DbUser:     env.String("DB_USER", "username"),
			DbPassword: env.String("DB_PASSWORD", "password"),
		},
	}
}
