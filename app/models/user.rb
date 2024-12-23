class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  # For API authentication
  include DeviseTokenAuth::Concerns::User
end
