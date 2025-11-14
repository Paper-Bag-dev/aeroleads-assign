class BlogController < ApplicationController
  def index
    render json: { status: "Hello from blog" }
  end

  def create
    prompt = params[:prompt]

    if prompt.blank?
      render json: { error: "Prompt cannot be empty" }, status: :bad_request
      return
    end

    puts "Got Request: #{prompt}"

    begin
      
      client = OpenAI::Client.new(
          access_token: ENV["AI_API_KEY"],
          uri_base: "https://api.groq.com/openai/v1/",
      )


      response = client.chat(
        parameters: {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: <<~SYS
                You are a content generation AI. 
                The user will give a list of blog titles and small descriptions. 
                You must return ONLY a valid JSON object in this format:

                {
                  "blogs": [
                    {
                      "title": "Blog title here",
                      "slug": "blog-title-here",
                      "content": "Full article content here, around 200-400 words."
                    }
                  ]
                }

                Do not include any text before or after the JSON.
              SYS
            },
            {
              role: "user",
              content: prompt
            }
          ]
        }
      )

      ai_text = response.dig("choices", 0, "message", "content")

      begin
        blogs = JSON.parse(ai_text)
      rescue JSON::ParserError
        blogs = { error: "AI response not in valid JSON format", raw: ai_text }
      end

      render json: blogs
    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end
