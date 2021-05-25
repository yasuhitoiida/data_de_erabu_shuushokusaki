Rails.application.routes.draw do
  namespace :api, format: 'json' do
    resources :users, only: :create
  end
  get '*path', to: 'home#index'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
