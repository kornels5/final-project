$(document).ready(function () {
  //session time
  
  let timeCounter = parseInt($('#workTime').html()),
    timeSeconds = timeCounter * 60,
    //break time
    breakTime = parseInt($('#breakTime').html()),
    breakSeconds = breakTime * 60,
    //INTERVAL
    interval = 0,
    //CURRENTLY DISPLAYED TIME ON POMODORRO
    currentTime = 0,
    //CHECKS IF INTERVAL IS STILL RUNNING
    alarm = $('#alarm')[0];

  //FUNCTION TO CONVERT SECONDS TO READABLE TIME

  function humanReadableTime(seconds) {
    minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    seconds %= 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  //SETTING TIME BUTTONS

  $('#minusClock').click(function () {
    if (timeSeconds > 1) {
      timeSeconds -= 60;
      $('#workTime').html(humanReadableTime(timeSeconds));
    }
  });
  $('#addClock').click(function () {
    timeSeconds += 60;
    $('#workTime').html(humanReadableTime(timeSeconds));
  });

  $('#minusBreak').click(function () {
    if (breakSeconds > 1) {
      breakSeconds -= 60;
      $('#breakTime').html(humanReadableTime(breakSeconds));
    }
  });
  $('#addBreak').click(function () {
    breakSeconds += 60;
    $('#breakTime').html(humanReadableTime(breakSeconds));
  });


  function counter(seconds, ) {
    interval = setInterval(function () {
      seconds -= 1;
      currentTime = seconds;
      $('#timer').html(humanReadableTime(seconds));
      if (seconds === 0) {
        alarm.play();
        clearInterval(interval);
      }
    }, 100);
  }

  // POMODORO BUTTONS 

  $('#pause, #resume').hide();

  $('#start').click(function () {
    $('#settings').hide();
    $(this).hide();
    $('#pause, #resume').show();
    $('#timer').html(humanReadableTime(timeSeconds));
    counter(timeSeconds);
  });

  $('#pause').click(function () {
    clearInterval(interval);
  });

  $('#resume').click(function () {
    counter(currentTime);
  });

  $('#toggleMenu').click(function(){
    $('#settings').animate({width: 'toggle'});
  });

});