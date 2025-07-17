@echo off
echo --- بدء رفع المشروع إلى GitHub وتفعيل GitHub Pages ---

REM --- الإعدادات ---
set "PROJECT_FOLDER=D:\final project\frontend15072025"
set "REPO_NAME=UNHabitatGISAleppo"
set "GITHUB_USER=HITechHouse"
set "USER_EMAIL=you@example.com"
set "MAIN_BRANCH=main"
set "PUBLISH_BRANCH=gh-pages"

cd /d %PROJECT_FOLDER% 2>nul || (
    echo ❌ المجلد غير موجود: %PROJECT_FOLDER%
    pause
    exit /b
)

REM --- تهيئة Git إذا لم يكن مهيأً ---
IF NOT EXIST .git (
    git init
)

git config user.name "%GITHUB_USER%"
git config user.email "%USER_EMAIL%"

REM --- إضافة الريموت إذا غير موجود ---
git remote get-url origin >nul 2>&1 || git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git

REM --- رفع إلى main ---
git checkout -B %MAIN_BRANCH%
git add .
git commit -m "Initial commit on main branch"
git pull origin %MAIN_BRANCH% --rebase
git push -f origin %MAIN_BRANCH%

REM --- رفع إلى gh-pages ---
git checkout -B %PUBLISH_BRANCH%
git add .
git commit -m "Deploy to gh-pages"
git config --global http.postBuffer 524288000
git push -f origin %PUBLISH_BRANCH%

REM --- تفعيل GitHub Pages ---
gh auth status >nul 2>&1
IF ERRORLEVEL 1 (
    echo ⚠️ لم يتم تسجيل الدخول إلى GitHub CLI. جاري تسجيل الدخول...
    gh auth login
)

echo --- تفعيل GitHub Pages من فرع gh-pages ---
gh api --method PATCH /repos/%GITHUB_USER%/%REPO_NAME%/pages --field source.branch=%PUBLISH_BRANCH% --field source.path="/"

REM --- عرض رابط الموقع ---
echo.
echo ✅ تم النشر بنجاح!
echo 🌐 رابط الموقع: https://%GITHUB_USER%.github.io/%REPO_NAME%/
pause
