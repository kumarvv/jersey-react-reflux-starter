# jersey-react-reflux-starter

Starter template with:
- Java
- Jersey
- ReactJS
- Reflux 
- jQuery 
- Lodash
- Babelify (react, es2015, stage-1)
- Browserify 
- Gulp (dev+production build options)


Installation 
---
- checkout from repo
- <code>mvn clean package</code>
- <code>cd client</code>
- <code>npm install</code>
- <code>npm install -g gulp browserify</code>

Build
---
- Development: <code>gulp all</code> 
- Production: <code>gulp all --production</code>
- generates two js files: 
-- *common.js* - all dependecies (minified when run for production) 
-- *app.js* - application code from app/**/*.jsx files 

Run
---
- drop the *jersey-react-reflux-starter-0.1.war* (/target folder) in tomcat or other web container
- open <code>http://localhost:8080</code> in your favorite browser


Sample
---
![Alt text](/sample.png?raw=true "Sample page")
