const getDate = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const split = date.split("-")

  return split[2] + " " + monthNames[parseInt(split[1])-1]
}

export const Utils = {
  getDate
};
