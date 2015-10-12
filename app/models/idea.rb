class Idea < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  enum quality: %w(Swill Plausible Genius)
end
