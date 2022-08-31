package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/kuwabuga/pokemon-api/config"
	"github.com/kuwabuga/pokemon-api/db/psql"
	"github.com/kuwabuga/pokemon-api/routers"

	gh "github.com/gorilla/handlers"
)

func main() {
	l := log.New(os.Stdout, "[ pokemon-api ] - ", log.LstdFlags)
	cfg := config.New(l)

	l.Println("Configuration created")
	l.Printf("%+v\n", cfg)

	// Establish connection with DB
	db, err := psql.Connect(cfg)
	if err != nil {
		l.Fatal(err)
	}
	defer db.Close()

	l.Println("Pinging DB")
	if err := db.Ping(); err != nil {
		l.Fatal(err)
	}

	sm := routers.New(l, db)

	credentials := gh.AllowCredentials()
	origins := gh.AllowedOrigins([]string{"*"})

	addr := fmt.Sprintf(":%d", cfg.BindAddress)
	// create a new server
	s := http.Server{
		Addr:         addr,                              // configure the bind address
		Handler:      gh.CORS(credentials, origins)(sm), // set the default handler
		ErrorLog:     l,                                 // set the logger for the server
		ReadTimeout:  5 * time.Second,                   // max time to read request from the client
		WriteTimeout: 10 * time.Second,                  // max time to write response to the client
		IdleTimeout:  120 * time.Second,                 // max time for connections using TCP Keep-Alive
	}

	// start the server
	go func() {
		l.Printf("Starting server on port %d\n", cfg.BindAddress)

		err := s.ListenAndServe()
		if err != nil {
			l.Printf("Error starting server: %s\n", err)
			os.Exit(1)
		}
	}()

	// trap sigterm or interupt and gracefully shutdown the server
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	// Block until a signal is received.
	sig := <-c
	log.Println("Got signal:", sig)

	// gracefully shutdown the server, waiting max 30 seconds for current operations to complete
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	s.Shutdown(ctx)
}
