require 'json'

puts 'param, portion, carry'
(Dir.entries('scans/') - ['.', '..']).sort_by { |e| e.split('.')[0].to_i }.each do |file|
  print file.split('.')[0]
  print ', '
  print `jq '[.repos[] | .domainIslands | .islandsByPortion[]] | length' scans/#{file}`.strip
  print ', '
  puts  `jq '[.repos[] | .domainIslands | .islandsByCarry[]] | length' scans/#{file}`.strip
end
