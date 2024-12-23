module Mutations
  class UpdateUser < BaseMutation
    argument :id, ID, required: true
    argument :email, String, required: false
    argument :name, String, required: false
    argument :old_password, String, required: false
    argument :password, String, required: false
    argument :password_confirmation, String, required: false

    field :user, Types::UserType, null: true
    field :token, String, null: true
    field :errors, [String], null: false

    def resolve(id:, email: nil, name: nil, password: nil, password_confirmation: nil, old_password: nil)
      user = User.find(id)

      if user&.valid_password?(password || user.password) && user.update(email: email, name: name, password: password, password_confirmation: password_confirmation)
        token = user.create_new_auth_token(SecureRandom.uuid)
        
        { user: user, errors: [], token: token['access-token'] }
      else
        raise GraphQL::ExecutionError.new(user.errors.full_messages.join(", "))
      end
    end
  end
end