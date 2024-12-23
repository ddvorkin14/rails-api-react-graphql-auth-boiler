class ApplicationController < ActionController::API
	include DeviseTokenAuth::Concerns::SetUserByToken
	
	def current_user
		@current_user ||= super || nil
	end
end
