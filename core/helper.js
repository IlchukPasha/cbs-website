const { format } = require('date-fns');
const { uk } = require('date-fns/locale');

module.exports = {
  formatEventTime(time) {
    const timeArray = time.split(':');
    return `${timeArray[0]}:${timeArray[1]}`;
  },
  formatEventDate(date) {
    return format(date, 'd MMMM, y', { locale: uk });
  }
};