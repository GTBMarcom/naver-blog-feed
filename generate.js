const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();
const FEED_URL = "https://rss.blog.naver.com/globaltechbank.xml";

(async () => {
  try {
    const feed = await parser.parseURL(FEED_URL);
    const items = feed.items.slice(0, 10); // 최신 10개만 사용

    const htmlItems = items.map(item => `
      <div class="item">
        <a href="${item.link}" target="_blank">${item.title}</a>
        <small>${new Date(item.pubDate).toLocaleDateString()}</small>
      </div>
    `).join("");

    const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>네이버 블로그 최신 글</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #ffffff;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      padding: 40px;
      box-sizing: border-box;
    }
    .item {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      padding: 20px;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .item:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }
    .item a {
      font-size: 1.1rem;
      font-weight: 600;
      color: #080b12;
      text-decoration: none;
      margin-bottom: 8px;
    }
    .item a:hover {
      text-decoration: underline;
    }
    .item small {
      color: #888;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
${htmlItems}
</body>
</html>`;

    fs.writeFileSync("index.html", fullHtml);
    console.log("✅ index.html 생성 완료");
  } catch (err) {
    console.error("❌ RSS 파싱 또는 파일 생성 중 오류 발생:", err.message);
    process.exit(1);
  }
})();
