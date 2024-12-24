module Mutations
  module Users
    class SignupUser < BaseMutation
      argument :email, String, required: true
      argument :name, String, required: true
      argument :password, String, required: true
      argument :password_confirmation, String, required: true

      field :token, String, null: true
      field :client, String, null: true
      field :user, Types::User::UserType, null: true
      field :errors, [String], null: false

      def resolve(email:, name:, password:, password_confirmation:)
        user = User.new(
          email: email,
          name: name,
          password: password,
          password_confirmation: password_confirmation
        )

        if user.save
          client_id = SecureRandom.uuid
          token = user.create_new_auth_token(client_id)
          
          { user: user, token: token['access-token'], client: client_id, errors: [] }
        else
          raise GraphQL::ExecutionError.new(user.errors.full_messages.join(", "))
        end
      end
    end
  end
end