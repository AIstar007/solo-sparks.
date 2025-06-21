 Update Axios Base URLs in Frontend
In all frontend API calls (LoginPage, Dashboard, ReflectionPage, etc.), update:

make

axios.post("http://localhost:5000/api/...") 

to

axios.post(https://dashboard.render.com/web/new)
