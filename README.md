# js-event-calendar
js based daily event calendar
Create a function that takes an array of objects that each represent an event. Each object in the array has a start and end time represented in minutes. The start and end times are represented as minutes after 9am. For example {start:30, end: 60} represents an event that starts at 9:30am and ends at 10am. The function takes the objects, and plots them as events on a vertical timeline. Events that have crossover will split the container in half, while events that don’t crossover will take the whole container width.
