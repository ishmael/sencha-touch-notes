class Note
  include Mongoid::Document
  field :title, :type => String
  field :content, :type => String
  field :user_id, :type => Integer
end
