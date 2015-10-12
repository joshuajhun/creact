class Api::V1::IdeasController < Api::V1::BaseController
 def index
  respond_with Idea.all
 end

 def create
  respond_with :api, :v1, Idea.create(idea_params)
 end

 def destroy
  respond_with Idea.destroy(params[:id])
 end
 private

 def idea_params
  params.permit(:title, :body, :quality)
 end
end
