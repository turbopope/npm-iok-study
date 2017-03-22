require "json"

puts "param, domainPortion, domainCarry, modulePortion, moduleCarry;"
(Dir.entries('../scans/') - ['.', '..']).sort_by { |e| e.split('.')[0].to_i }.each do |file|
  param = file.split('.')[0]
  stats = JSON.parse(`jq '{domainPortion: ([.repos[] | .domainIslands.islandsByPortion | .[]] | length), domainCarry: ([.repos[] | .domainIslands.islandsByCarry | .[]] | length), modulePortion: ([.repos[] | .moduleIslands.islandsByPortion | .[]] | length), moduleCarry: ([.repos[] | .moduleIslands.islandsByCarry | .[]] | length)}' scans/#{file}`.strip())
  domainPortion = stats['domainPortion']
  domainCarry = stats['domainCarry']
  modulePortion = stats['modulePortion']
  moduleCarry = stats['moduleCarry']
  puts "#{param}, #{domainPortion}, #{domainCarry}, #{modulePortion}, #{moduleCarry};"
end
