var express = require('express');
var mysql = require('mysql');
var cors = require ('cors');

var app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(cors());

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

});

app.get('/api/cursos' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/courses.json');
    let student = JSON.parse(rawdata);
    console.log(student);

    res.send(student)
 
});

app.get('/api/usuarios' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/users.json');
    let student = JSON.parse(rawdata);
    console.log(student);

    res.send(student)
 
});

app.get('/api/matriculas' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/enrollments.json');
    let student = JSON.parse(rawdata);
    console.log(student);

    res.send(student)
 
});

//matriculas por id de estudiante
app.get('/api/matriculas/:id' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/enrollments.json');
    let students = JSON.parse(rawdata);
    let students_array= students.enrollments;
    let student=students_array.filter(s=>s.user==req.params.id);

    res.send(student)
 
});


app.get('/api/contenidos' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/pages.json');
    let student = JSON.parse(rawdata);
    console.log(student);

    res.send(student)
 
});

app.post('/api/login' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/users.json');
    let data = JSON.parse(rawdata);
    let users = data.users;
    let user=users.filter(s=>s.firstname==req.body.username);
    console.log(user);

    res.send(user);
 
});

app.get('/api/contenido/:id' , (req , res)=>{

    'use strict';

    //{"id":478,"course":"A1","content":"a1/page_1.html"}
    //back/archivos/content/a1/page_1.html

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/pages.json');
    let archivo = JSON.parse(rawdata);
    let pages = archivo.pages;
    let user=pages.filter(s=>s.course==req.params.id);
    let userss  = '';
    var rawdata2 = '';
    let datas = '';
    var data ;
    var aa ; 
    user.forEach(page => {

        if (page.content != "") {
            
        
            userss = 'archivos/content/' + page.content;

            // const data = fs.readFileSync(userss,
            //     {encoding:'utf8', flag:'r'});
            console.log(userss);
        
            fs.access(userss, fs.F_OK, (err) => {
                if (err) {
                console.error(err)
                return
                }

                console.log("entra");
                fs.readFile(userss, 'utf8' , (err, data) => {
                    if (err) {
                        return
                    }
                    aa = data;
                    res.send(aa);
                })
            
            })
            
        }
        
    });
   
 
});

/* CONTENIDO DESARROLLOS*/

app.get('/api/empresas' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/empresas.json');
    let data = JSON.parse(rawdata);
    console.log(data);
    res.send(data);
 
});


/* 
    Registro de un usuario  
*/
app.post('/api/registro' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let number = 10;
    let user_new =  {
        "id": number,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "correo": req.body.correo,
        "login": req.body.login
    }

    let rawdata = fs.readFileSync('archivos/data/users.json');
    let datas = JSON.parse(rawdata);

    let user=datas.filter(s=>s.login==req.body.login);
    
    if (user==0) {
        datas.push(user_new);
        let data_final = JSON.stringify(datas);
        console.log(data_final);
        fs.writeFileSync('archivos/data/users.json', data_final);

        res.send("usuario creado");
    }else{
        res.send("Ya existe login");
    }

});

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function () {
    console.log("Puerto: "+ puerto);
    
});
