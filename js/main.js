
  data  =  [
    { id: '1', resourceId: 'b', start: '2019-11-18T02:00:00', end: '2019-11-18T07:00:00', title: 'event 1' },
    { id: '2', resourceId: 'c', start: '2019-11-18T05:00:00', end: '2019-11-18T22:00:00', title: 'event 2' },
    { id: '3', resourceId: 'd', start: '2019-11-19', end: '2019-11-19', title: 'event 3' },
    { id: '4', resourceId: 'e', start: '2019-11-20T03:00:00', end: '2019-11-20T08:00:00', title: 'event 4' },
    { id: '5', resourceId: 'f', start: '2019-11-20T00:30:00', end: '2019-11-20T02:30:00', title: 'event 5' },
    { id: '5', resourceId: 'f', start: '2019-11-20T01:30:00', end: '2019-11-20T15:30:00', title: 'event 9' }
  ]


  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'dayGrid', 'timeGrid', 'resourceTimeline' ],
      now: '2019-11-17',
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      header: {
        left: 'today prev,next 일정등록',
        center: 'title',
        right: 'timeGridWeek,dayGridMonth'
      },
      defaultView: 'timeGridWeek',
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimeline',
          duration: { days: 3 },
          buttonText: '3 days'
        }
      },
      customButtons: {
      일정등록 : {
        text: '일정등록',
        click: function() {
          var titleStr = prompt('일정 이름을 쓰세요.');
          var dateStr = prompt('날짜를 입력하세요. YYYY-MM-DD format');
          var timeStr = 'T'+prompt('시간을 입력하세요. 00:00 format') + ':00';
           date = new Date(dateStr + timeStr); // will be in local time

          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: titleStr,
              start: date
            });
            alert('일정 등록 완료');
            // alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
        }

      },
      custom2: {
        text: 'custom 2',
        click: function() {
          alert('clicked custom button 2!');
        }
      }
    },
      resourceLabelText: 'Rooms', // sourceLabelText는 스케쥴 그룹을 의미
      resourceText: function(resource) {
        return 'Auditorium ' + ('' + resource.id).toUpperCase();
      },
      resourceRender: function(arg) {
        if (arg.resource.id == 'h') {
          arg.el.style.backgroundColor = 'rgb(255, 243, 206)';
        }
      },
      locale: 'ko',
      resources: [
        { id: 'a' },
        { id: 'b', eventColor: 'green' },
        { id: 'c', eventColor: 'orange' },
        { id: 'd' },
        { id: 'e' },
        { id: 'f', eventColor: 'red' },
        { id: 'g' },
        { id: 'h' },
        { id: 'i' }
      ],
      events:data
    });

    calendar.render();
  });
