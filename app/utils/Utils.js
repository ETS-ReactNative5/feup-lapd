// Get date in format DD Month
const getDate = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const split = date.split("-")

  return split[2] + " " + monthNames[parseInt(split[1])-1]
}

// Get date in format YYYY-MM-DD
const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

// Get a dictionary where the keys are the dates between startDate and endDate
const getPlanDates = (startDate, endDate) => {
  var dates = {},
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates[formatDate(currentDate)] = []
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

export const Utils = {
  getDate,
  formatDate,
  getPlanDates
};
