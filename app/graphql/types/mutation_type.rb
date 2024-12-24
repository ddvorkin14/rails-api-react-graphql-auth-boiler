# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :signup_user, mutation: Mutations::Users::SignupUser
    field :login_user, mutation: Mutations::Users::LoginUser
    field :update_user, mutation: Mutations::Users::UpdateUser
    field :create_page, mutation: Mutations::Pages::CreatePage
    field :update_page, mutation: Mutations::Pages::UpdatePage
  end
end
