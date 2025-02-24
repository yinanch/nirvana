const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();
const db = new sqlite3.Database('./server/users.db');

// 中间件
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// 密码加密
const saltRounds = 10;

// 登录接口
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: '用户不存在' });
            }
            
            bcrypt.compare(password, user.password_hash, (err, match) => {
                if (match) {
                    res.cookie('role', user.role, { httpOnly: true });
                    res.json({ role: user.role });
                } else {
                    res.status(401).json({ error: '密码错误' });
                }
            });
        }
    );
});

// 鉴权中间件
function checkRole(role) {
    return (req, res, next) => {
        if (req.cookies.role === role) {
            next();
        } else {
            res.redirect('/login.html');
        }
    };
}

// 角色路由
app.get('/admin', checkRole('A'), (req, res) => res.sendFile('admin.html', { root: 'public' }));
app.get('/coach', checkRole('B'), (req, res) => res.sendFile('coach.html', { root: 'public' }));
app.get('/member', checkRole('C'), (req, res) => res.sendFile('member.html', { root: 'public' }));

// 启动服务
app.listen(3000, () => console.log('Server running on port 3000'));
