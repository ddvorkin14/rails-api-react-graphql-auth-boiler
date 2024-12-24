class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
  has_many :pages

  # For API authentication
  include DeviseTokenAuth::Concerns::User

  enum role: { admin: "admin", moderator: "moderator", viewer: "viewer" }

  # Set a default role for new users
  after_initialize do
    self.role ||= "viewer"
  end
end
