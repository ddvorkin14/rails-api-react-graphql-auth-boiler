# app/graphql/mutations/login_user.rb
module Mutations
  module Pages
    class CreatePage < BaseMutation
      argument :title, String, required: true
      argument :content, GraphQL::Types::JSON, required: true
      argument :user_id, ID, required: true
      
      field :page, Types::Page::PageType, null: true
      field :errors, [String], null: false
      field :user, Types::User::UserType, null: true

      def resolve(title:, content:, user_id:)
        user = User.find(user_id)
        page = user.pages.build(title: title, content: content)
        
        if page.save
          { page: page, user: user }
        else
          { page: nil, errors: page.errors.full_messages }
        end
      end
    end
  end
end