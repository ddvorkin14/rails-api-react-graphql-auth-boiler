# frozen_string_literal: true

class GraphqlController < ApplicationController
  # If accessing from outside this domain, nullify the session
  # This allows for outside API access while preventing CSRF attacks,
  # but you'll have to authenticate your user separately

  before_action :authenticate_user!

  def authenticate_user!
    token = request.headers['access-token']
    
    if request.path == "/graphql" || params["operationName"] == "LoginUser" || params["operationName"] == "signupUser"
      return
    end

    if token.blank?
      # render json: { errors: ['No access token provided'] }, status: :unauthorized
      return
    end
    
    @current_user = User.find(request.headers['id'])
    if @current_user && @current_user.valid_token?(request.headers['access-token'], request.headers['client'])
      return
    end
    
    unless @current_user
      # render json: { errors: ['Invalid access token'] }, status: :unauthorized
      return
    end
  end

  def current_user
    @current_user
  end

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: current_user,
    }
    result = BoilerplateSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue StandardError => e
    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end

  private

  # Handle variables in form data, JSON body, or a blank value
  def prepare_variables(variables_param)
    case variables_param
    when String
      if variables_param.present?
        JSON.parse(variables_param) || {}
      else
        {}
      end
    when Hash
      variables_param
    when ActionController::Parameters
      variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{variables_param}"
    end
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    render json: { errors: [{ message: e.message, backtrace: e.backtrace }], data: {} }, status: 500
  end
end
