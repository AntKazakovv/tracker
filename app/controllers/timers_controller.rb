class TimersController < ApplicationController
    skip_before_action :verify_authenticity_token
    layout "mailer"
    def index
        @timers = Timer.all
        
    end

    def show
        @timer = Timer.find(params[:id])
    end

    def create
        @paramTimeArray = params[:time].split(":")
        @newTimer = Timer.create(label: params[:label], time: params[:time])
        render json: @newTimer
    end

    def destroy
        @timer = Timer.find(params[:id])
        @timer.destroy
        redirect_to root_path
    end

    def update
        @timer = Timer.find_by(label: params[:label])
        @timer.time = params[:time]
        @timer.save
        head 200
    end
end
