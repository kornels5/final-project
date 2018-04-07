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

  //QUOTE ARRAY

  let quotes = [
    'Whatever the mind of man can conceive and believe, it can achieve. – Napoleon Hill',
    'Strive not to be a success, but rather to be of value. – Albert Einstein',
    'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference. – Robert Frost',
    'I attribute my success to this: I never gave or took any excuse. – Florence Nightingale',
    'You miss 100% of the shots you don\’t take. –Wayne Gretzky',
    'I\'ve missed more than 9000 shots in my career. I\'ve lost almost 300 games. 26 times I\'ve been trusted to take the game winning shot and missed. I\'ve failed over and over and over again in my life. And that is why I succeed. – Michael Jordan',
    'The most difficult thing is the decision to act, the rest is merely tenacity. –Amelia Earhart',
    'Every strike brings me closer to the next home run. – Babe Ruth',
    'Definiteness of purpose is the starting point of all achievement. – W. Clement Stone',
    'Life isn\'t about getting and having, it\'s about giving and being. – Kevin Kruse',
    'Life is what happens to you while you\’re busy making other plans. – John Lennon',
    'We become what we think about. – Earl Nightingale',
    'An unexamined life is not worth living. – Socrates',
    'Eighty percent of success is showing up. –Woody Allen',
    'Your time is limited, so don\’t waste it living someone else\’s life. – Steve Jobs',
    'Winning isn\’t everything, but wanting to win is. – Vince Lombardi',
    'I am not a product of my circumstances. I am a product of my decisions. – Stephen Covey',
    'Every child is an artist.  The problem is how to remain an artist once he grows up. – Pablo Picasso',
    'You can never cross the ocean until you have the courage to lose sight of the shore. – Christopher Columbus'
  ]

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
    }, 1000);
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
        $('#title').html('work/brake');
      }
    }, 1000);
  }

  // POMODORO BUTTONS 

  $('#pause, #resume').hide();

  $('#start').click(function () {
    $('#quote').html('');
    $('#resume').attr('disabled', true).css('color', 'rgba(0,0,0,0.4)');
    $(this).hide();
    $('#pause, #resume').show();
    $('#timer').html(humanReadableTime(timeSeconds));
    counter(timeSeconds);
  });

  $('#pause').click(function () {

    $(this).attr('disabled', true).css('color', 'rgba(0,0,0,0.4)');
    $('#resume').removeAttr('disabled').css('color', 'orangered');
    if (workMode === 'work') {
      clearInterval(interval);
    } else if (workMode === 'break') {
      clearInterval(intervalBreak);
    }
  });

  $('#resume').click(function () {
    $(this).attr('disabled', true).css('color', 'rgba(0,0,0,0.4)');
    $('#pause').removeAttr('disabled').css('color', 'orangered');
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

  $('ul').on('click', '.name', function () {
    $('li').toggleClass('completed');
    $('#currentTask').html('');
  });

  $('ul').on('click', 'li', function () {
    $(this).toggleClass('completed');
    $('#currentTask').html('');
  });

  $('ul').on('click', 'span', function (event) {
    if ($(this).attr('class') === 'remove') {
      $('#currentTask').html('');
      $(this).parent().fadeOut(500, function () {
        $(this).remove();
      });
    }
    if ($(this).attr('class') === 'addTask') {
      $('#currentTask').html($(this).prev().html());
    }
    event.stopPropagation();
  });

  $('input[type="text"]').keypress(function (event) {
    if (event.which === 13 && $('ul').children().length < 6) {
      let taskName = $(this).val();
      $(this).val('');
      $('ul').append(`<li><span class="remove"><i class="fas fa-trash-alt"></i></span><span class="name">${taskName}</span><span class="addTask"><i class="fas fa-plus-circle"></i></span></li>`);
    }
  });

  // QUOTE GENERATOR

  function newQuote() {
    let randomNumber = Math.floor(Math.random() * quotes.length);
    $('#quote').html(quotes[randomNumber]);
  }

  $('#quoteGenerator').click(function () {
    $(this).children().attr('class', 'far fa-smile');
    newQuote();
  });

  $('#quoteGenerator').mouseleave(function () {
    $(this).children().attr('class', 'far fa-meh');
  });
});