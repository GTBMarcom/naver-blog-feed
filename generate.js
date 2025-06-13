const Parser = require("rss-parser");
const fs = require("fs");

const parser = new Parser();
const FEED_URL = "https://rss.blog.naver.com/globaltechbank.xml";

(async () => {
  try {
    const feed = await parser.parseURL(FEED_URL);
    const items = feed.items.slice(0, 10);

    const htmlItems = items.map(item => `
      <div class="item">
        <a href="${item.link}" target="_blank">${item.title}</a><br>
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
      font-family: sans-serif;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      padding: 20px;
      background: #ffffff;
    }
    .item {
      border: 1px solid #eee; /* ✅ 더 연한 그레이 */
      padding: 10px;
      height: 110px;           /* ✅ 조금 더 낮은 높이 */
      overflow: hidden;
      background-color: #fff;
    }
    .item a {
      font-weight: bold;
      text-decoration: none;
      color: black;           /* ✅ 링크 텍스트 블랙 */
    }
    .item a:hover {
      text-decoration: underline;
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
