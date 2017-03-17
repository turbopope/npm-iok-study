def execute(cmd)
  puts cmd
  `#{cmd}`
end


for param in (0..1).step(0.05)
  param = param.round(2)
  execute "node scan.js #{param} #{param} > scans/#{(param * 100).to_i}.json"
end
