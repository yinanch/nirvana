// 赛训数据（直接嵌入）
const events = [
    { date: '2025-02-23', type: 'match', title: '对阵糖果超甜' },
];

// 生成当前周及前后两周（共5周）
function generateCalendar() {
    const today = new Date();
    const calendarBody = document.getElementById('calendarBody');
    const monthHeader = document.getElementById('currentMonth');
    
    // 设置显示月份
    monthHeader.textContent = today.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long' 
    }) + ' 赛训安排';

    // 计算起始日期（当前周周一 - 2周）
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay() + 1 - 14); // 回到前两周的周一
    
    // 生成35天（5周）
    let html = '';
    for (let week = 0; week < 5; week++) {
        html += '<tr>';
        for (let day = 0; day < 7; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + (week * 7) + day);
            
            // 日期格式化
            const dateStr = currentDate.toISOString().split('T')[0];
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            
            // 匹配当日事件
            const dayEvents = events.filter(e => e.date === dateStr);
            
            html += `
                <td class="calendar-day ${isToday ? 'today' : ''}">
                    <div class="p-2">
                        <small>${currentDate.getDate()}</small>
                        <div class="event-markers mt-1">
                            ${dayEvents.map(e => `
                                <div class="event-dot ${e.type}" 
                                     title="${e.title}"></div>
                            `).join('')}
                        </div>
                    </div>
                </td>
            `;
        }
        html += '</tr>';
    }
    calendarBody.innerHTML = html;
}

// 页面加载时生成
generateCalendar();
