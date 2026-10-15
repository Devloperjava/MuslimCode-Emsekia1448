const fs = require("fs");
const path = require("path");

const GRADLE = path.join(__dirname, "android", "app", "build.gradle");
let g = fs.readFileSync(GRADLE, "utf8");

console.log("🔧 تعديل build.gradle...\n");

// احذف أي إضافة سابقة
g = g.replace(/def keystoreProperties[\s\S]*?\n\}\n/g, "");

// أضف keystoreProperties قبل android {
g = g.replace(
  /^android\s*\{/m,
  `def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {`
);

// احذف signingConfigs السابق إن وجد
g = g.replace(/signingConfigs\s*\{[\s\S]*?\n\s*\}\n/g, "");

// أضف signingConfigs قبل buildTypes
g = g.replace(
  /buildTypes\s*\{/,
  `signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }

    buildTypes {`
);

// أضف signingConfig إلى release
g = g.replace(
  /(buildTypes\s*\{[\s\S]*?release\s*\{)/,
  "$1\n            signingConfig signingConfigs.release"
);

fs.writeFileSync(GRADLE, g, "utf8");
console.log("✓ build.gradle محدّث ب signingConfigs");