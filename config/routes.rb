Rails.application.routes.draw do
  
  resources :pieces
  resources :piece_of_clothings
  resources :brands
  resources :styles
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  Rails.application.routes.default_url_options[:host] = "localhost:3000"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
