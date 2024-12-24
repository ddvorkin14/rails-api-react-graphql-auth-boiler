# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    # Admin role: can manage everything
    if user.admin?
      can :manage, :all
    end

    # Moderator role: can manage Pages but not Users
    if user.moderator?
      can :manage, Page
    end

    # Viewer role: can only read Pages
    if user.viewer?
      can :read, Page
    end
  end
end
