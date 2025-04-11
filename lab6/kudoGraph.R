# Install ggplot2 if you haven't already
install.packages("ggplot2")

# Load ggplot2 package
library(ggplot2)

# Install the readr package if you don't have it
install.packages("readr")

# Load the readr package
library(readr)

# Sample data (day of the month and kudos values)
#data <- data.frame(
#  date = as.Date(c('2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05', '2025-01-06')),
#  kudos = c(5, 8, 10, 6, 9, 7)
#)


# Read the CSV using read_csv() from readr, automatically converts to date objects
data <- read_csv("kudos.csv")

# Print the data
print(data)
