Rails.application.routes.draw do
  namespace :api, format: 'json' do
    post 'login', to: 'sessions#create'
    get 'alternatives', to: 'alternatives#index'
    get 'criteria', to: 'criteria#index'
    resources :users, only: %i[create update destroy] do
      collection do
        get 'me'
      end
    end
    resources :analyses, only: %i[index show create destroy]
  end
  get '*path', to: 'home#index'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
