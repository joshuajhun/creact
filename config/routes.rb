Rails.application.routes.draw do
  root to: 'site#index'

  namespace :api do
    namespace :v1 do
      resources :ideas, except: [:show, :new, :edit]
    end
  end
end
