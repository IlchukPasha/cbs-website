const { format } = require('date-fns');
const { uk } = require('date-fns/locale');

module.exports = {
  formatEventTime(time) {
    const timeArray = time.split(':');
    return `${timeArray[0]}:${timeArray[1]}`;
  },
  formatEventDate(date) {
    return format(date, 'd MMMM, y', { locale: uk });
  },
  escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) {
      return map[m];
    });
  },
  excapeScript(text) {
    return text
      .replace(/<script[^>]*>/gi, "&lt;script&gt;")
      .replace(/<\/script[^>]*>/gi, "&lt;/script&gt;");
  }
};
