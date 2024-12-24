# app/graphql/mutations/login_user.rb
module Mutations
  module Pages
    class UpdatePage < BaseMutation
      argument :id, ID, required: true
      argument :title, String, required: false
      argument :content, GraphQL::Types::JSON, required: false

      field :page, Types::Page::PageType, null: true
      field :errors, [String], null: false

      def resolve(id:, title: nil, content: nil)
        page = Page.find(id)
        
        if page.update(title: title || page.title, content: content || page.content)
          { page: page, errors: [] }
        else
          { page: nil, errors: page.errors.full_messages }
        end
      end
    end
  end
end