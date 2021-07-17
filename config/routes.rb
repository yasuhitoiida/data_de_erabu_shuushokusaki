Rails.application.routes.draw do
  namespace :api, format: 'json' do
    post 'login', to: 'sessions#create'
    resources :users, only: :create do
      collection do
        get 'me'
      end
    end
    resources :analyses, only: %i[index show create]
  end
  get '*path', to: 'home#index'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
