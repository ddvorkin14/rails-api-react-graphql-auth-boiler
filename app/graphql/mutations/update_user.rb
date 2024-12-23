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
    field :client, String, null: true

    def resolve(id:, email: nil, name: nil, password: nil, password_confirmation: nil, old_password: nil)
      user = User.find(id)

      if password.present?
        unless user.valid_password?(old_password)
          raise GraphQL::ExecutionError.new("Old password is incorrect")
        end                
      end

      if user.update(email: email || user.email, name: name, password: password, password_confirmation: password_confirmation)
        client = SecureRandom.uuid
        token = user.create_new_auth_token(client)
        
        { user: user, errors: [], token: token['access-token'], client: client }
      else
        raise GraphQL::ExecutionError.new(user.errors.full_messages)
      end
    end
  end
end