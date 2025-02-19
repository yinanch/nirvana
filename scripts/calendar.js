document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    // 动态日期范围（过去两周+未来三周）
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 14);
    const endDate = new Date();
    endDate.setDate(today.getDate() + 21);

    // 初始化日历
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'zh-cn',
        firstDay: 1,
        validRange: {
            start: startDate,
            end: endDate
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        events: '../data/schedule.json',
        eventContent: function(arg) {
            // 自定义事件内容
            const typeBadge = document.createElement('span');
            typeBadge.className = 'badge me-2';
            typeBadge.style.backgroundColor = arg.event.backgroundColor;
            typeBadge.textContent = arg.event.extendedProps.type;
            
            const title = document.createElement('span');
            title.textContent = arg.event.title;

            const domNodes = [typeBadge, title];
            return { domNodes: domNodes };
        },
        datesSet: function(dateInfo) {
            // 强制锁定日期范围
            if (dateInfo.start < startDate || dateInfo.end > endDate) {
                calendar.gotoDate(today);
            }
        },
        eventClick: function(info) {
            // 点击事件显示详情
            const detail = `
                类型：${info.event.extendedProps.type}
                时间：${info.event.start.toLocaleString()}
                地点：${info.event.extendedProps.location || '待通知'}
            `;
            alert(detail);
        }
    });

    calendar.render();
});
