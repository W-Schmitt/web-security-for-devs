package main

import (
	"html/template"
	"io"
	"log"
	"net/http"
	"time"
)

const (
	userRole  string = "user"
	adminRole string = "admin"
)

type page struct {
	title string
}

var templates = template.Must(template.ParseFiles("templates/home.gohtml"))

func renderTemplate(w http.ResponseWriter, templateName string, p page) {
	err := templates.ExecuteTemplate(w, templateName+".gohtml", p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	expiration := time.Now().Add(365 * 24 * time.Hour)
	cookie := http.Cookie{Name: "role", Value: userRole, Expires: expiration}
	http.SetCookie(w, &cookie)
	renderTemplate(w, "home", page{"Home"})
}

func adminHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("role")
	if err != nil {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	}
	if cookie.Value != adminRole {
		http.Redirect(w, r, "/", http.StatusUnauthorized)
	} else {
		io.WriteString(w, "Well done! Don't forget to check user role properly in the server.")
	}
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/admin", adminHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
