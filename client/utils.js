'use strict';


function scrollBottom() {
  window.setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 1);
}


module.exports = {
  scrollBottom
};
