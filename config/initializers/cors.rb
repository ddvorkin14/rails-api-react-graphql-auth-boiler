Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # Or specify frontend domain, e.g., 'http://localhost:3001'
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
  end
end
