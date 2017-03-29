require "json"

repoDir = '/home/mbrack/ma/npm-repos/'
result = Array.new

(Dir.entries(repoDir) - ['.', '..', 'keywords_counted.json']).each do |file|
  rev = nil
  Dir.chdir("#{repoDir}#{file}"){
    rev = `git rev-parse --verify HEAD`.strip[0, 7]
  }
  result.push("#{file}@#{rev}")
end

puts result.to_json
