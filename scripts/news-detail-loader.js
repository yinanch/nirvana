// 获取URL中的锚点ID
const targetId = window.location.hash.substring(1);

fetch('../data/news.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('newsContainer');
        
        data.articles.forEach(article => {
            const articleDiv = document.createElement('article');
            articleDiv.className = 'news-article';
            articleDiv.id = article.id;
            
            articleDiv.innerHTML = `
                <h3 class="mb-3">${article.title}</h3>
                <div class="text-muted small mb-4">${article.date}</div>
                <div class="news-content">${article.content}</div>
                ${article.wechat ? `
                <a href="${article.wechat}" target="_blank" class="wechat-link">
                    <i class="bi bi-wechat"></i> 微信文章
                </a>
                ` : ''}
            `;
            
            container.appendChild(articleDiv);
        });

        // 自动滚动到目标文章
        if(targetId) {
            const targetElement = document.getElementById(targetId);
            if(targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    });
