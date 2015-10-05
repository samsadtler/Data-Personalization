var lastPosition = {
  x: null,
  y: null
};

var delta = {
  x: 0,
  y: 0
};

var inhaling = false;


$(function() {
  setInterval(function breath() {
    $('body').css({
      transform: 'scale(' + (inhaling ? '0.9' : '1.0') + ')',
      transition: 'transform 1s ease-in-out'
    });

    inhaling = !inhaling;
  }, 2000);

  window.addEventListener('mousemove', function(e) {

    updateLastPosition(e.pageX, e.pageY);

    $('a').each(function() {
      var element = $(this),
          matrix,
          nextX,
          nextY,
          numberOfChanges;

      if (isNear(element, getRandomInt(10, 150), e)) {
        numberOfChanges = element.data('numberOfChanges') || 0;

        if (numberOfChanges >= 10) {
          return;
        }

        matrix = new WebKitCSSMatrix(element.css("transform"));
        nextX = delta.x + matrix.e;
        nextY = delta.y + matrix.f;

        element.css({
          transform: 'translate(' + nextX + 'px, ' + nextY + 'px)',
          display: 'inline-block'
        });

        element.data('numberOfChanges', numberOfChanges + 1);
      }
    });
  });
});

function updateLastPosition(x, y) {
  if (!!lastPosition.x) {
    delta.x = x - lastPosition.x;
    delta.y = y - lastPosition.y;
  } else {
    delta.x = x - getRandomInt(-10, 10);
    delta.y = y - getRandomInt(-10, 10);
  }

  lastPosition.x = x;
  lastPosition.y = y;
}

function updateDelta(x, y) {
  delta.x = x;
  delta.y = y;
}

function isNear(element, distance, e) {
  var left = element.offset().left - distance,
      top = element.offset().top - distance,
      right = left + element.width() + 2 * distance,
      bottom = top + element.height() + 2 * distance,
      x = e.pageX,
      y = e.pageY;

  return (
    x > left &&
    x < right &&
    y > top &&
    y < bottom
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}