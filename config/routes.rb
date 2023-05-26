Rails.application.routes.draw do
  
  resources :matches
  resources :messages
  resources :swipes
  resources :profiles
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  patch '/users/:user_id/profile', to: 'profiles#update'


  Rails.application.routes.default_url_options[:host] = "localhost:3000"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
