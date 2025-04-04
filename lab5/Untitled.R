# Install ggplot2 if you haven't already
install.packages("ggplot2")

# Load ggplot2 package
library(ggplot2)

# Sample data (day of the month and kudos values)
data <- data.frame(
  date = as.Date(c('2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05', '2025-01-06')),
  kudos = c(5, 8, 10, 6, 9, 7)
)

# Plot the line chart
ggplot(data, aes(x = date, y = kudos)) +
  geom_line(color = "steelblue", size = 1.5) +  # Line with blue color
  geom_point(color = "red", size = 3) +         # Red dots for each data point
  labs(title = "Kudos Line Chart",
       x = "Date",
       y = "Kudos") +
  theme_minimal() +                             # Clean theme
  scale_x_date(date_labels = "%b %d, %Y",       # Format x-axis to show full date
               date_breaks = "1 day") +         # Set the breaks to 1 day
  theme(axis.text.x = element_text(angle = 45, hjust = 1))  # Rotate x-axis labels for better readability


ggsave("kudos_line_chart.png", plot = plot, width = 10, height = 6, dpi = 300)
