// 加载最新3条新闻
fetch('data/news.json')
    .then(response => response.json())
    .then(data => {
        const articles = data.articles
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3); // 取最新3条
        
        const container = document.getElementById('newsPreview');
        
        articles.forEach(article => {
            const card = document.createElement('div');
            card.className = 'col';
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <div class="text-muted small mb-2">${article.date}</div>
                        <p class="card-text">${article.summary}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="news.html#${article.id}" class="btn btn-primary btn-sm">查看详情</a>
                            <a href="${article.wechat}" target="_blank" class="text-decoration-none">
                                <img src="images/wx.png" width="20" alt="微信文章">
                            </a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    });
