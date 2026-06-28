package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Question struct {
    Prompt  string   `json:"prompt"`
    Options []string `json:"options"`
    Answer  string   `json:"answer"`
}

type QuizPayload struct {
    Topic     string     `json:"topic"`
    Questions []Question `json:"questions"`
}

var quizzes = map[string]QuizPayload{
    "Angular": {
        Topic: "Angular",
        Questions: []Question{
            {
                Prompt:  "Which Angular feature is used to create reusable UI components?",
                Options: []string{"Directive", "Component", "Service", "Module"},
                Answer:  "Component",
            },
            {
                Prompt:  "What is Angular primarily used for?",
                Options: []string{"Backend APIs", "Building web apps", "Database design", "System administration"},
                Answer:  "Building web apps",
            },
        },
    },
    "JavaScript": {
        Topic: "JavaScript",
        Questions: []Question{
            {
                Prompt:  "Which keyword is used to declare a constant in JavaScript?",
                Options: []string{"let", "var", "const", "static"},
                Answer:  "const",
            },
            {
                Prompt:  "What does DOM stand for?",
                Options: []string{"Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Module"},
                Answer:  "Document Object Model",
            },
        },
    },
    "General Knowledge": {
        Topic: "General Knowledge",
        Questions: []Question{
            {
                Prompt:  "What is the capital of France?",
                Options: []string{"Berlin", "Madrid", "Paris", "Rome"},
                Answer:  "Paris",
            },
            {
                Prompt:  "How many continents are there?",
                Options: []string{"5", "6", "7", "8"},
                Answer:  "7",
            },
        },
    },
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })

    mux.HandleFunc("/api/quizzes", func(w http.ResponseWriter, r *http.Request) {
        topic := r.URL.Query().Get("topic")
        if topic == "" {
            topic = "Angular"
        }

        quiz, ok := quizzes[topic]
        if !ok {
            http.NotFound(w, r)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(quiz)
    })

    mux.HandleFunc("/api/quizzes/all", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(quizzes)
    })

    log.Println("Quiz API listening on :8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}
