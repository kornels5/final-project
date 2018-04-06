$(document).ready(function () {
  //session time

  let timeCounter = parseInt($('#workTime').html()),
    timeSeconds = timeCounter * 60,
    //break time
    breakTime = parseInt($('#breakTime').html()),
    breakSeconds = breakTime * 60,
    //INTERVALS
    interval = 0,
    intervalBreak = 0,
    //CURRENTLY DISPLAYED TIME ON POMODORRO
    currentTime = 0,
    //ALARM
    alarm = $('#alarm')[0],
    //VARIABLE TO HOLD NAME OF CURRENTLY RUNNING TASK
    workMode = '';

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
    if (timeSeconds > 60) {
      timeSeconds -= 60;
      $('#workTime').html(humanReadableTime(timeSeconds));
    }
  });
  $('#addClock').click(function () {
    timeSeconds += 60;
    $('#workTime').html(humanReadableTime(timeSeconds));
  });

  $('#minusBreak').click(function () {
    if (breakSeconds > 60) {
      breakSeconds -= 60;
      $('#breakTime').html(humanReadableTime(breakSeconds));
    }
  });
  $('#addBreak').click(function () {
    breakSeconds += 60;
    $('#breakTime').html(humanReadableTime(breakSeconds));
  });


  function counter(seconds) {
    interval = setInterval(function () {
      $('#title').html('work');
      workMode = 'work';
      seconds -= 1;
      currentTime = seconds;
      $('#timer').html(humanReadableTime(seconds));
      if (seconds === 0) {
        alarm.play();
        clearInterval(interval);
        counterBreak(breakSeconds);
      }
    }, 100);
  }

  function counterBreak(seconds) {
    intervalBreak = setInterval(function () {
      $('#title').html('break');
      workMode = 'break';
      seconds -= 1;
      currentTime = seconds;
      $('#timer').html(humanReadableTime(seconds));
      if (seconds === 0) {
        alarm.play();
        clearInterval(intervalBreak);
        workMode = '';
        $('#start').show();
        $('#pause, #resume').hide();
        $('#title').html('');
      }
    }, 100);
  }

  // POMODORO BUTTONS 

  $('#pause, #resume').hide();

  $('#start').click(function () {
    $(this).hide();
    $('#pause, #resume').show();
    $('#timer').html(humanReadableTime(timeSeconds));
    counter(timeSeconds);
  });

  $('#pause').click(function () {

    $(this).attr('disabled', true);
    $('#resume').removeAttr('disabled');
    if (workMode === 'work') {
      clearInterval(interval);
    } else if (workMode === 'break') {
      clearInterval(intervalBreak);
    }
  });

  $('#resume').click(function () {

    $(this).attr('disabled', true);
    $('#pause').removeAttr('disabled');
    if (workMode === 'work') {
      counter(currentTime);
    } else if (workMode === 'break') {
      counterBreak(currentTime);
    }
  });

  //TASK LIST

  $('#toggleMenu').click(function () {
    $('#settings, #session, #break').animate({
      width: 'toggle'
    });
  });

  $('ul').on('click', 'li', function(){
    $(this).toggleClass('completed');
  });

  $('ul').on('click', 'span', function(){
    $(this).parent().fadeOut(500, function(){
      $(this).remove();
    });
    event.stopPropagation();
  });

  $('input[type="text"]').keypress(function(event){
    if(event.which === 13) {
      let taskName = $(this).val();
      $(this).val('');
      $('ul').append(`<li><span class="remove"><i class="fas fa-trash-alt"></i></span>${taskName}</li>`);
    }
  });

});