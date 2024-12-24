module Types
  module Page
    class PageType < BaseObject
      field :id, ID, null: false
      field :title, String, null: false
      field :content, GraphQL::Types::JSON, null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      field :user, Types::User::UserType, null: false
    end
  end
end