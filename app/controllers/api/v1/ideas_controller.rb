class Api::V1::IdeasController < Api::V1::BaseController
 def index
   respond_with Idea.all
 end
end
