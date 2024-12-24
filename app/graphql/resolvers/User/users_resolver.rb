module Resolvers
  module User
    class UsersResolver < GraphQL::Schema::Resolver
      type [Types::User::UserType], null: false

      def resolve
        users = ::User.all

        case context[:current_user].role
        when 'admin'
          users
        when 'moderator'
          users.where(role: %w[viewer moderator])
        else
          raise GraphQL::ExecutionError, "You do not have permission to perform this action"
        end
      end
    end
  end
end