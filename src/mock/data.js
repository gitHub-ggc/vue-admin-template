module.exports = function(app){
    app.get("/userinfo",function(req,rej){
        rej.json({ username: '张三',age:18 });
    })
    app.post("/list",function(req,rej){
        rej.json({data:[1,2,3,4,5,6]});
    })
}