class Api::UsersController < ApplicationController
  before_action :authenticate!, except: :create

  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @@current_user.update(user_params)
      render json: @@current_user
    else
      render json: @@current_user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @@current_user.destroy!
  end

  def me
    render json: @@current_user
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
