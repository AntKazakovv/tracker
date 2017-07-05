class TimersController < ApplicationController
    layout "mailer"
    def index
        @timers = Timer.all
        @timer = Timer.new
    end

end
