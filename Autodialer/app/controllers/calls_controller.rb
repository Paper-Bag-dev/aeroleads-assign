class CallsController < ApplicationController
  require "twilio-ruby"
  
  @@call_log = []
  
  def create
    phone_nos = Array(params[:phone_numbers]).map(&:to_s).reject(&:blank?)
    client = Twilio::REST::Client.new(ENV["TWILIO_ACCOUNT_SID"], ENV["TWILIO_AUTH_TOKEN"])
    trial_from_number = ENV["TWILIO_PHONE_NUMBER"]

    verified_numbers = client.outgoing_caller_ids.list.map(&:phone_number)
    response_log = []

    phone_nos.each do |phone_no|
      next response_log << { phone_number: phone_no, error: "Number not verified in trial account" } unless verified_numbers.include?(phone_no)

      begin
        call = client.api.v2010.calls.create(
          twiml: '<Response><Say voice="alice">Ahoy, World!</Say></Response>',
          to: phone_no,
          from: trial_from_number,
          status_callback: "#{ENV["SERVER_URL"]}/calls/update_status",
          status_callback_method: "POST"
        )

        @@call_log << {
          sid: call.sid,
          phone_number: phone_no,
          status: call.status,
          duration: 0
        }

        response_log << { phone_number: phone_no, call_sid: call.sid, status: call.status }
      rescue Twilio::REST::TwilioError => e
        response_log << { phone_number: phone_no, error: e.message, code: e.code }
      end
    end

    render json: { status: "Calls initiated", log: response_log }, status: :ok
  end

  def update_status
      sid = params["CallSid"]
      status = params["CallStatus"]
      duration = params["CallDuration"].to_i

      # Update in-memory record
      record = @@call_log.find { |c| c[:sid] == sid }
      if record
        record[:status] = status
        record[:duration] = duration if duration > 0
      end

      head :ok
  end

  def index
  render json: { call_log: @@call_log }
  end
  def show; end
end