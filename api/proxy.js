export default async function handler(req, res) {
    try {
        const nodes = generateNodes();
        return res.status(200).send(nodes);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
}

function generateNodes() {
    const vercelDomain = "your-project-name.vercel.app"; // 替换为您的 Vercel 项目域名
    const uuid1 = "412b4238-204e-4c17-893d-14f13b5dde4f"; // 替换为您的 UUID

    const nodes = [
        {
            v: "2",
            ps: "Vercel 节点 1",
            add: "proxy.zhu-di.us.kg", // 使用 Vercel 域名
            port: "443", // Vercel 默认使用 443 端口
            id: uuid1,
            aid: "64",
            net: "ws",
            type: "vless",
            host: "proxy.zhu-di.us.kg",
            path: "/api/proxy", // API 路径
            tls: "tls", // 启用 TLS
        },
        {
            v: "2",
            ps: "Vercel 节点 2",
            add: vercelDomain, // 使用 Vercel 域名
            port: "443", // Vercel 默认使用 443 端口
            id: uuid1,
            aid: "64",
            net: "ws",
            type: "none",
            host: "",
            path: "/api/proxy", // API 路径
            tls: "tls", // 启用 TLS
        },
    ];

    return nodes.map(node => {
        return `vmess://${Buffer.from(JSON.stringify(node)).toString('base64')}`;
    }).join('\n');
}
