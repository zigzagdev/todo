

json.array! @lists do |list|
  json.(list,:content, :name)
end