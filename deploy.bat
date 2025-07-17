@echo off
echo --- بدء رفع المشروع إلى GitHub وتفعيل GitHub Pages ---

REM --- الإعدادات ---
set PROJECT_FOLDER=D:\final project\frontend1507202
set REPO_NAME=UNHabitatGISAleppo
set GITHUB_USER=HITechHouse
set USER_EMAIL=hthsyria@gmail.com
set MAIN_BRANCH=main
set PUBLISH_BRANCH=gh-pages

REM --- الانتقال إلى مجلد المشروع ---
cd "%PROJECT_FOLDER%"

REM --- تهيئة Git إذا لم يكن مهيأً ---
IF NOT EXIST .git (
    git init
)

REM --- إعداد معلومات المستخدم ---
git config user.name "%GITHUB_USER%"
git config user.email "%USER_EMAIL%"

REM --- إنشاء المستودع على GitHub (عام) ---
echo --- التحقق من وجود المستودع على GitHub ---
gh repo view %GITHUB_USER%/%REPO_NAME% >nul 2>&1
IF ERRORLEVEL 1 (
    echo --- إنشاء المستودع على GitHub ---
    gh repo create %GITHUB_USER%/%REPO_NAME% --public --source=. --remote=origin --push
) ELSE (
    echo --- المستودع موجود مسبقًا ---
    git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git 2>nul
)

REM --- إنشاء الفرع main ورفع الملفات ---
git checkout -B %MAIN_BRANCH%
git add .
git commit -m "Initial commit on main branch"
git push -u origin %MAIN_BRANCH%

REM --- إنشاء فرع gh-pages ورفع الملفات للنشر ---
git checkout -B %PUBLISH_BRANCH%
git add .
git commit -m "Deploy to gh-pages"
git push -u origin %PUBLISH_BRANCH%

REM --- تفعيل GitHub Pages من فرع gh-pages ---
gh api --method PATCH /repos/%GITHUB_USER%/%REPO_NAME%/pages --field source.branch=%PUBLISH_BRANCH% --field source.path="/"

REM --- عرض رابط النشر ---
echo.
echo --- تم النشر بنجاح! ---
echo --- رابط الموقع: https://%GITHUB_USER%.github.io/%REPO_NAME%/ ---
pause
