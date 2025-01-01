export default async function handler(req, res) {
    try {
        const { method } = req;

        if (method !== 'GET') {
            return res.status(405).send('Method Not Allowed');
        }

        const url = new URL(req.url, `https://${req.headers.host}`);
        const path = url.pathname.toLowerCase();

        if (path === '/api/proxy') {
            // 生成 V2RayN 订阅节点
            const nodes = generateNodes();
            return res.status(200).send(nodes);
        } else {
            return res.status(404).send('未找到该路径！');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }
}

function generateNodes() {
    const nodes = [
        {
            v: "2", // V2Ray 协议版本
            ps: "节点1", // 节点名称
            add: "example1.com", // 服务器地址
            port: "443", // 端口
            id: "your-uuid-1", // UUID
            aid: "64", // Alter ID
            net: "ws", // 网络协议
            type: "none", // 伪装类型
            host: "", // WebSocket 主机
            path: "/path1", // WebSocket 路径
            tls: "tls", // 是否启用 TLS
        },
        {
            v: "2",
            ps: "节点2",
            add: "example2.com",
            port: "443",
            id: "your-uuid-2",
            aid: "64",
            net: "ws",
            type: "none",
            host: "",
            path: "/path2",
            tls: "tls",
        },
    ];

    // 生成 V2RayN 配置文本
    return nodes.map(node => {
        return `vmess://${Buffer.from(JSON.stringify(node)).toString('base64')}`;
    }).join('\n');
}
