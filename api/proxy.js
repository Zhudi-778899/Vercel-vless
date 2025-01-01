import { connect } from 'cloudflare:sockets';
import fetch from 'node-fetch'; // 如果需要使用 fetch

let userID = '';
let proxyIP = '';
let sub = '';
let subConverter = 'SUBAPI.fxxk.dedyn.io';
let subConfig = "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini_MultiMode.ini";
let subProtocol = 'https';
let subEmoji = 'true';
let socks5Address = '';
let parsedSocks5Address = {};
let enableSocks = false;

let fakeUserID;
let fakeHostName;
let noTLS = 'false';
const expire = 4102329600; //2099-12-31
let proxyIPs;
let socks5s;
let go2Socks5s = [
    '*ttvnw.net',
    '*tapecontent.net',
    '*cloudatacdn.com',
    '*.loadshare.org',
];
let addresses = [];
let addressesapi = [];
let addressesnotls = [];
let addressesnotlsapi = [];
let addressescsv = [];
let DLS = 8;
let remarkIndex = 1; // CSV备注所在列偏移量
let FileName = atob('ZWRnZXR1bm5lbA==');
let BotToken;
let ChatID;
let proxyhosts = [];
let proxyhostsURL = '';
let RproxyIP = 'false';
let httpsPorts = ["2053", "2083", "2087", "2096", "8443"];
let 有效时间 = 7;
let 更新时间 = 3;
let userIDLow;
let userIDTime = "";
let proxyIPPool = [];
let path = '/?ed=2560';
let 动态UUID;
let link = [];
let banHosts = [atob('c3BlZWQuY2xvdWRmbGFyZS5jb20=')];

export default async function handler(req, res) {
    try {
        const UA = req.headers['user-agent'] || 'null';
        userID = process.env.UUID || process.env.uuid || process.env.PASSWORD || process.env.pswd || userID;

        if (process.env.KEY || process.env.TOKEN || (userID && !isValidUUID(userID))) {
            动态UUID = process.env.KEY || process.env.TOKEN || userID;
            有效时间 = Number(process.env.TIME) || 有效时间;
            更新时间 = Number(process.env.UPTIME) || 更新时间;
            const userIDs = await 生成动态UUID(动态UUID);
            userID = userIDs[0];
            userIDLow = userIDs[1];
        }

        if (!userID) {
            return res.status(404).send('请设置你的UUID变量，或尝试重试部署，检查变量是否生效？');
        }

        // 处理请求逻辑
        const url = new URL(req.url, `http://${req.headers.host}`);
        const 路径 = url.pathname.toLowerCase();

        if (路径 == '/') {
            return res.status(200).json({ message: '欢迎使用代理服务' });
        } else if (路径 == `/${fakeUserID}`) {
            const fakeConfig = await 生成配置信息(userID, req.headers.host, sub, 'Vercel-SUB', RproxyIP, url, process.env);
            return res.status(200).send(fakeConfig);
        } else {
            return res.status(404).send('未找到该路径！');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.toString());
    }
}

// 其他函数定义...
async function 生成动态UUID(密钥) {
    // 生成动态UUID的逻辑
}

function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

async function 生成配置信息(userID, hostName, sub, UA, RproxyIP, _url, env) {
    // 生成配置的逻辑
}

// 其他辅助函数...


export default async function handler(req, res) {
    try {
        const { method } = req;

        if (method !== 'GET') {
            return res.status(405).send('Method Not Allowed');
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const path = url.pathname.toLowerCase();

        if (path === '/api/proxy') {
            // 生成 V2RayN 订阅节点
            const nodes = generateNodes();
            return res.status(200).send(nodes);
        } else if (path === '/') {
            return res.status(200).sendFile('public/index.html');
        } else {
            return res.status(404).send('未找到该路径！');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.toString());
    }
}

function generateNodes() {
    // 这里生成 V2RayN 节点的示例
    const nodes = [
        {
            name: "节点1",
            server: "example1.com",
            port: 443,
            uuid: "your-uuid-1",
            alterId: 64,
            cipher: "aes-128-gcm",
            network: "ws",
            path: "/path1",
            tls: true,
        },
        {
            name: "节点2",
            server: "example2.com",
            port: 443,
            uuid: "your-uuid-2",
            alterId: 64,
            cipher: "aes-128-gcm",
            network: "ws",
            path: "/path2",
            tls: true,
        },
    ];

    // 生成 V2RayN 配置文本
    return nodes.map(node => {
        return `vmess://${btoa(JSON.stringify(node))}`;
    }).join('\n');
}
