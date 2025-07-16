@echo off
echo --- بدء رفع الموقع إلى GitHub وتفعيل GitHub Pages على gh-pages ---

REM مسار المشروع
set PROJECT_FOLDER=D:\final project\frontend1507202

REM اسم المستودع
set REPO_NAME=UNGIS

REM اسم المستخدم على GitHub
set GITHUB_USER=HITechHouse

REM اسم الفرع المخصص للنشر
set PUBLISH_BRANCH=gh-pages

cd "%PROJECT_FOLDER%"

REM تهيئة Git إذا لم يكن مهيأً
IF NOT EXIST .git (
    git init
)

REM إعداد اسم المستخدم والبريد (مرة واحدة فقط - يمكنك تعديلهما لاحقًا)
git config user.name "%GITHUB_USER%"
git config user.email "you@example.com"

REM إنشاء المستودع على GitHub (عام) باستخدام gh CLI
gh repo create %GITHUB_USER%/%REPO_NAME% --public --source=. --remote=origin --push

REM إنشاء فرع gh-pages
git checkout -b %PUBLISH_BRANCH%

REM إضافة جميع الملفات
git add .

REM تنفيذ أول commit
git commit -m "Initial deploy to gh-pages"

REM رفع الملفات إلى الفرع gh-pages
git push -u origin %PUBLISH_BRANCH%

REM تفعيل GitHub Pages من فرع gh-pages
gh api --method PATCH /repos/%GITHUB_USER%/%REPO_NAME%/pages --field source.branch=%PUBLISH_BRANCH% --field source.path="/"

REM عرض الرابط النهائي
echo --- تم النشر بنجاح! ---
echo --- رابط الموقع: https://%GITHUB_USER%.github.io/%REPO_NAME%/ ---
pause
