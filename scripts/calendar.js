document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    // 动态日期范围计算
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 14); // 过去两周
    const endDate = new Date();
    endDate.setDate(today.getDate() + 21); // 未来三周

    // 初始化日历
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'zh-cn',
        firstDay: 1, // 周一开始
        validRange: { // 限制显示范围
            start: startDate,
            end: endDate
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        events: '/scripts/schedule.json', // 数据源
        eventDidMount: function(info) { // 事件渲染回调
            // 添加类型标识
            const typeBadge = document.createElement('span');
            typeBadge.className = 'event-type';
            typeBadge.textContent = info.event.extendedProps.type;
            info.el.prepend(typeBadge);

            // 添加点击交互
            if (info.event.extendedProps.link) {
                info.el.addEventListener('click', function() {
                    window.location.href = info.event.extendedProps.link;
                });
            }
        },
        datesSet: function(dateInfo) { // 日期范围变化时
            const currentStart = new Date(dateInfo.start);
            const currentEnd = new Date(dateInfo.end);
            
            // 限制只能查看指定范围
            if (currentStart < startDate || currentEnd > endDate) {
                calendar.gotoDate(today);
            }
        }
    });

    calendar.render();
});
