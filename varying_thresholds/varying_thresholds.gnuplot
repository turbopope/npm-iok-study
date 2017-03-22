set title 'IoK Metrics With Varying Threshold'
set xlabel 'Threshold'
set ylabel 'Number of Islands'
set xtics 5
set datafile separator ","
set term pdf
set output 'varying_thresholds.pdf'
set lab
plot 'varying_thresholds.csv' using 1:4 title "modulePortion" with lines,\
     'varying_thresholds.csv' using 1:2 title "domainPortion" with lines,\
     'varying_thresholds.csv' using 1:5 title "moduleCarry" with lines,\
     'varying_thresholds.csv' using 1:3 title "domainCarry" with lines
