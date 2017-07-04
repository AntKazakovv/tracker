class TimersController < ApplicationController
    def index
        @timers = Timer.all
        @timer = Timer.new

        render layout: "mailer"
    end

end
