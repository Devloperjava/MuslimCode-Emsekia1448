const fs = require("fs");
const path = require("path");

const WEB = path.join(__dirname, "web");
let app = fs.readFileSync(path.join(WEB, "app.js"), "utf8");

console.log("🔔 إضافة إشعار كل ساعة...\n");

// احذف أي إضافة سابقة
app = app.replace(/\/\/ ===== إشعار كل ساعة =====[\s\S]*?\/\/ ===== تحميل البيانات =====/, "// ===== تحميل البيانات =====");

// أضف إشعار كل ساعة قبل "تحميل البيانات"
const hourlyNotify = `// ===== إشعار كل ساعة =====
let lastHourlyNotify = 0;

function checkHourlyNotification() {
  const now = new Date();
  const currentHour = now.getHours();

  // هل تغيرت الساعة؟
  if (currentHour === lastHourlyNotify) return;

  // تذكير كل ساعة
  lastHourlyNotify = currentHour;

  // رسائل متنوعة
  const messages = [
    {
      title: "🌙 MuslimCode — تطبيق الإمساكية",
      body: "ادعمنا على GitHub\\nSupported For MuslimCode\\n\\ngithub.com/MuslimCode"
    },
    {
      title: "🕌 إمساكية رمضان 1448",
      body: "من تطوير MuslimCode\\nSupported For MuslimCode\\n\\n⭐ Star on GitHub"
    },
    {
      title: "✨ MuslimCode",
      body: "شكراً لاستخدامك التطبيق\\nSupported For MuslimCode\\n\\ngithub.com/MuslimCode"
    }
  ];

  // اختر رسالة عشوائية
  const msg = messages[currentHour % messages.length];

  showNotification(msg.title, msg.body);
}

// ===== تحميل البيانات =====`;

app = app.replace("// ===== تحميل البيانات =====", hourlyNotify);

// أضف استدعاء الدالة في init
app = app.replace(
  /setInterval\(function \(\) \{[\s\S]*?checkNotifications\(\);[\s\S]*?\}, 1000\);/,
  `setInterval(function () {
    renderCountdown();
    checkNotifications();
    checkHourlyNotification();
  }, 1000);`
);

fs.writeFileSync(path.join(WEB, "app.js"), app, "utf8");
console.log("✓ app.js: إشعار كل ساعة مضاف");
console.log("  • يذكّر بـ MuslimCode كل ساعة");
console.log("  • يحتوي على رابط GitHub");
console.log("  • Supported For MuslimCode");
`;

**احفظ وأغلق، ثم:**

```cmd
node add-hourly.js