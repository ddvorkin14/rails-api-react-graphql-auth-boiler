# app/graphql/mutations/login_user.rb
module Mutations
  class LoginUser < BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :token, String, null: true
    field :client, String, null: true
    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(email:, password:)
      user = User.find_by(email: email)

      if user&.valid_password?(password)
        client_id = SecureRandom.uuid
        token = user.create_new_auth_token(client_id)
        
        { token: token['access-token'], client: client_id, user: user, errors: [] }
      else
        { token: nil, user: nil, errors: ['Invalid credentials'] }
      end
    end
  end
end
