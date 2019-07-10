import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

let adminToken;
let userToken;


describe('Test for bus registration and get', () => {
  /**
   * Test for trips
   */
  describe('Test for buses', () => {
    it('it should sign in the admin user and return a token', (done) => {
      const user = {
        email: 'markokaba99@gmail.com',
        password: 'johnbaby',
      };
      chai
        .request(app)
        .post('/api/v1/users/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          const { token } = res.body.data;
          adminToken = token;
          done();
        });
    });
    it('it should sign in the normal user and return a token', (done) => {
      const user = {
        email: 'jj06@gmail.com',
        password: 'johnbaby',
      };
      chai
        .request(app)
        .post('/api/v1/users/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          const { token } = res.body.data;

          userToken = token;
          done();
        });
    });
    it('it should register a new bus', (done) => {
      const newBus = {
        number_plate: 'ABJ-5875-20',
        manufacturer: 'Toyota',
        model: 'Hiace',
        year: '2014',
        capacity: 20,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('bus_id');
          res.body.data.should.have.property('number_plate');
          res.body.data.should.have.property('manufacturer');
          res.body.data.should.have.property('model');
          res.body.data.should.have.property('year');
          res.body.data.should.have.property('capacity');
          done();
        });
    });
    it('it should throw error because bus is already registered', (done) => {
      const newBus = {
        number_plate: 'ABJ-5875-20',
        manufacturer: 'Toyota',
        model: 'Hiace',
        year: '2014',
        capacity: 20,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('This bus is already registered');

          done();
        });
    });
    it('it should throw error because of admin rights', (done) => {
      const newBus = {
        number_plate: 'ABJ-12-5633',
        manufacturer: 'Volkswagen',
        model: 'VZ2378',
        year: '2017',
        capacity: 18,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Authorized for only admins');
          done();
        });
    });
    it('it should throw error because number plate is missing in request', (done) => {
      const newBus = {
        manufacturer: 'Volkswagen',
        model: 'VZ2378',
        year: '2017',
        capacity: 18,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('number_plate is required and must be a string');
          done();
        });
    });
    it('it should throw error because of manufacturer is missing in request', (done) => {
      const newBus = {
        number_plate: 'ABJ-12-5633',
        model: 'VZ2378',
        year: '2017',
        capacity: 18,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('manufacturer is required and must be a string');
          done();
        });
    });
    it('it should throw error because of model is missing in request', (done) => {
      const newBus = {
        number_plate: 'ABJ-12-5633',
        manufacturer: 'Volkswagen',
        year: '2017',
        capacity: 18,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('model is required and must be a string');
          done();
        });
    });
    it('it should throw error because of year is missing in request', (done) => {
      const newBus = {
        number_plate: 'ABJ-12-5633',
        manufacturer: 'Volkswagen',
        model: 'VZ2378',
        capacity: 18,
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('year is required and must be a string');
          done();
        });
    });
    it('it should throw error because of capacity is missing in request', (done) => {
      const newBus = {
        number_plate: 'ABJ-12-5633',
        manufacturer: 'Volkswagen',
        model: 'VZ2378',
        year: '2017',
      };
      chai
        .request(app)
        .post('/api/v1/buses/register')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newBus)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('capacity is required and must be an integer');
          done();
        });
    });
    it('it should get all the buses by the admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/buses/')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('it should get all the buses by the user', (done) => {
      chai
        .request(app)
        .get('/api/v1/buses/')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          done();
        });
    });
    it('it should get a specific bus', (done) => {
      chai
        .request(app)
        .get('/api/v1/buses/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('object');
          done();
        });
    });
    it('it should throw error because of invalid ID', (done) => {
      chai
        .request(app)
        .get('/api/v1/buses/1.5')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('bus_id is required and must be an integer');
          done();
        });
    });
    it('it should throw error because bus does not exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/buses/50000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('This bus does not exist');
          done();
        });
    });
  });
});
