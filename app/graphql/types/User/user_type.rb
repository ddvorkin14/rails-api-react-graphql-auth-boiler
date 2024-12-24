module Types
  module User
    class UserType < BaseObject
      field :id, ID, null: false
      field :email, String, null: false
      field :name, String, null: false
      field :role, String, null: false
      field :pages, [Types::Page::PageType], null: false
    end
  end
end