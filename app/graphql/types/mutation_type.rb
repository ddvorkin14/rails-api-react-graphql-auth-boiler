# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :signup_user, mutation: Mutations::SignupUser
    field :login_user, mutation: Mutations::LoginUser
    field :update_user, mutation: Mutations::UpdateUser
  end
end
