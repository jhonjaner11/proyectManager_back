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
    console.log(data);
    let users = data.users;
    let user=users.filter(s=>s.login==req.body.username);
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

/*************** CONTENIDO DESARROLLOS*****************/

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

    
    var ruta= 'archivos/data/users.json';
    var obj = "users";
    var number = obtener_id(ruta, obj);
    let user_new =  {
        "id": number,
        "firstname":req.body.newUser.firstname,
        "lastname":req.body.newUser.lastname,
        "correo": req.body.newUser.correo,
        "login": req.body.newUser.login
    }

    let rawdata = fs.readFileSync('archivos/data/users.json');
    let datas = JSON.parse(rawdata);

    let user=datas.users.filter(s=>s.login==req.body.newUser.login);
    
    if (user==0) {
        datas.users.push(user_new);
        let data_final = JSON.stringify(datas);
        console.log(data_final);
        fs.writeFileSync('archivos/data/users.json', data_final);

        res.send("usuario creado");
    }else{
        res.send("Ya existe login");
    }

});


function obtener_id(ruta, obj) {

    'use strict';

    const fs = require('fs');

    var mayor = 0;

    
    // var ruta= 'archivos/data/tareas.json';
    // var obj = "tareas";

    let rawdata = fs.readFileSync(ruta);
    let datas = JSON.parse(rawdata);
    
    var tam = datas[obj].length;
    var i = 0
    for(i; i < tam; i++){
        // console.log(i);
        // console.log( datas[obj][i]);
        if (datas[obj][i].id > mayor)

        {

            mayor = datas[obj][i].id;

        }

    }

    return mayor+1;
}

/* obtiene las empresas donde esta adjudicado el usuario */
app.get('/api/empresas_usuarios/:id' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/empresas_usuarios.json');
    let data = JSON.parse(rawdata);
    let students_array= data.empresas_usuarios;
    let student=students_array.filter(s=>s.id_usuario==req.params.id);
    console.log("empresa:");
    //console.log(student);
    //let id_empresa = student[0].id_empresa;

    let rawdata2 ;
    rawdata2 = fs.readFileSync('archivos/data/empresas.json');
    let data2 = JSON.parse(rawdata2);
    let empresas_array= data2.empresas;
    let aaa = [];

    student.forEach(element => {
        console.log(element);
        let empresas=empresas_array.filter(s=>s.id==element.id_empresa);
        aaa.push(empresas[0]);
    });

    console.log(aaa);

    
    
    
    
    
    res.send(aaa)

});

/* obtiene las empresas donde esta adjudicado el usuario */
app.get('/api/proyectos/:id' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/proyectos.json');
    let data = JSON.parse(rawdata);
    let data_array= data.proyectos;
    let objeto=data_array.filter(s=>s.empresa==req.params.id);
    console.log("proyectos:");
    console.log(objeto);
    // let id_empresa = objeto[0].id_empresa;

    // console.log(id_empresa);

    // let rawdata2 = fs.readFileSync('archivos/data/empresas.json');
    // let data2 = JSON.parse(rawdata2);
    // let empresas_array= data2.empresas;
    // let empresas=empresas_array.filter(s=>s.id==id_empresa);
    
    res.send(objeto)

});

/* obtiene las historias del proyecto el usuario */
app.get('/api/historias_usuarios/:id' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/historias_usuario.json');
    let data = JSON.parse(rawdata);
    let data_array= data.h_u;
    let objeto=data_array.filter(s=>s.proyecto==req.params.id);
    console.log("H_U:");
    console.log(objeto);
    // let id_empresa = objeto[0].id_empresa;

    // console.log(id_empresa);

    // let rawdata2 = fs.readFileSync('archivos/data/empresas.json');
    // let data2 = JSON.parse(rawdata2);
    // let empresas_array= data2.empresas;
    // let empresas=empresas_array.filter(s=>s.id==id_empresa);
    
    res.send(objeto)

});

function crearTarea(tarea_new) {

    'use strict';

    const fs = require('fs');

    console.log("entro a prueba");
    let rawdata = fs.readFileSync('archivos/data/tareas.json');
    let datas = JSON.parse(rawdata);
    
    datas.tareas.push(tarea_new);
    let data_final = JSON.stringify(datas);

    fs.writeFileSync('archivos/data/tareas.json', data_final);
}

/* Crear Historia */
app.post('/api/historia_usuario' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    

    var ruta= 'archivos/data/historias_usuario.json';
    var obj = "h_u";
    var number_hist = obtener_id(ruta, obj);


    var hist_new = {
          
        "id": number_hist,
        "proyecto":req.body.newHistoria.proyecto,
        "nombre": req.body.newHistoria.nombre,
        "usuario_creador": req.body.newHistoria.usuario_creador,
        "observacion":req.body.newHistoria.observacion,

    }

    let rawdata = fs.readFileSync('archivos/data/historias_usuario.json');
    let datas = JSON.parse(rawdata);
    datas.h_u.push(hist_new);
    let data_final = JSON.stringify(datas);

    fs.writeFileSync('archivos/data/historias_usuario.json', data_final);   


    let number_tarea = 100;
    
    var tarea = {
          
        "id": number_tarea,
        "nombre":req.body.newHistoria.name_tarea,
        "estado":"Activo",
        "Comentarios": req.body.newHistoria.comentarios_tarea,
        "h_u": number_hist,
        "usuario": req.body.newHistoria.usuario_creador,
        "usuario_creador":req.body.newHistoria.usuario_creador,
            
    }

    crearTarea(tarea);


    res.send("Tarea Historia");

    
});



/* obtiene las tareas de la historia de usuario */
app.get('/api/tareas/:id' , (req , res)=>{

    'use strict';

    
    const fs = require('fs');

    let rawdata = fs.readFileSync('archivos/data/tareas.json');
    let data = JSON.parse(rawdata);
    let data_array= data.tareas;
    let objeto=data_array.filter(s=>s.h_u==req.params.id);
    
    // let id_empresa = objeto[0].id_empresa;

    // console.log(id_empresa);

    // let rawdata2 = fs.readFileSync('archivos/data/empresas.json');
    // let data2 = JSON.parse(rawdata2);
    // let empresas_array= data2.empresas;
    // let empresas=empresas_array.filter(s=>s.id==id_empresa);
    
    res.send(objeto)

});

/* Crear tarea */
app.post('/api/tarea' , (req , res)=>{

    'use strict';

    const fs = require('fs');

    //let number = 10;

    var ruta= 'archivos/data/tareas.json';
    var obj = "tareas";
    var number = obtener_id(ruta, obj);

    var tarea_new =  {
        "id": number,
        "nombre":req.body.newTarea.name_tarea,
        "estado":"Activo",
        "Comentarios": req.body.newTarea.comentarios_tarea,
        "h_u": req.body.newTarea.historia_usuario,
        "usuario": req.body.newTarea.usuario,
        "usuario_creador":req.body.newTarea.usuario_creador,
        
    }

    let rawdata = fs.readFileSync('archivos/data/tareas.json');
    let datas = JSON.parse(rawdata);
    
    datas.tareas.push(tarea_new);
    let data_final = JSON.stringify(datas);
    //console.log(data_final);
    fs.writeFileSync('archivos/data/tareas.json', data_final);

    res.send("Tarea Creada");


});

/* Eliminar tarea */
app.delete('/api/tarea/:id' , (req , res)=>{

    console.log("delete");
    'use strict';

    const fs = require('fs');

    var aa = obtener_id();
    console.log(aa);

    // let rawdata = fs.readFileSync('archivos/data/tareas.json');
    // let datas = JSON.parse(rawdata);
    // console.log(datas);
    // console.log(req.params.id);
    // let arreglo = datas.tareas;
    // let tarea=arreglo.filter(s=>s.id==req.params.id);

    // console.log(tarea[0]);

    // var i = arreglo.indexOf( tarea[0] );
    // console.log("indice " + i);
    // if ( i !== -1 ) {
    //     arreglo.splice( i, 1 );
    // }

    // console.log(arreglo);

    // datas.tareas = arreglo;

    // let data_final = JSON.stringify(datas);

    // fs.writeFileSync('archivos/data/tareas.json', data_final);

    res.send("Tarea Eliminada");


});

/* obtiene las Empresas */
app.get('/api/empresas/' , (req , res)=>{

    'use strict';

    
    const fs = require('fs');



    let rawdata2 = fs.readFileSync('archivos/data/empresas.json');
    let data2 = JSON.parse(rawdata2);
    let empresas_array= data2.empresas;

    
    res.send(empresas_array)

});


const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function () {
    console.log("Puerto: "+ puerto);
    
});
