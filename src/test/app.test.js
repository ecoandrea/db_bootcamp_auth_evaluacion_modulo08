import request from "supertest"; 
import { expect } from "chai";
import app from "../server.js";


describe('backend funcionanado',() =>{
    describe('Servidor esta arriba',() =>{
        it('Debería iniciar el servidor sin problemas',(done)=>{
            request(app)
            .get('/')
            .expect(404)
            .end((err,res) =>{
                if(err) return done(err);
                expect(res.status).to.equal(404);
                done();
            })
        })
    })
})


describe('backend funcionando', () => {
    describe('Servidor y base de datos', () => {
        it('Debería iniciar el servidor y conectar a la base de datos', (done) => {
            request(app)
                .get('/control_db') 
                .expect(200) 
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});



  describe('CRUD de User  funcionando', () => {
    it('Debería crear un usuario exitosamente', async() => {
        const userData = {
            firstName: "Fernanda",
            lastName: "Silva",
            email: "ferd.silva@correo.com",
          
        };

        const res = await request(app).post('/api/v1/user').send(userData);
        expect(res.body.message).to.equal("Usuario creado con éxito");
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include(userData)
        
    });

    it('Debería devolver todos los usuarios activos', async() => {
        const res = await request(app).get("/api/v1/user");
        expect(res.status).to.equal(200)
        expect(res.body.data).to.be.an('array')
        expect(res.body.message).to.equal("Usuarios obtenidos con éxito");
    });

    it('Debería actualizar correctamente un usuario ya existente por ID', async() => {
        const id = '548d4a77-0945-4757-b451-45cf3f340c3e';

        const updateUser = {
            firstName: "Fernanda",
            lastName: "Silva",
            email: "nanda.silva@correo.com",
        };

        const res = await request(app).put(`/api/v1/user/${id}`).send(updateUser);

        expect(res.body.message).to.equal('Usuario actualizado con éxito');
        expect(res.status).to.equal(200);
        expect(res.body.newData).to.includes(updateUser);
       
    })
  })
