import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

let adminToken;
let userToken;
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWNva2FiYTk5QGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjEzNzcwNzksImV4cCI6MTU2MTQ2MzQ3OX0.V3pac02NZLFvqTxT8xyLBLxdxlrpkb-V93VGWI671sM';
const invalidToken = 'UzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWNva2FiYTk5QGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjEzNzcwNzksImV4cCI6MTU2MTQ2MzQ3OX0.V3pac02NZLFvqTxT8xyLBLxdxlrpkb-V93VGWI671sM';


describe('Test for trips creation and get', () => {
  /**
   * Test for trips
   */
  describe('Test for trips', () => {
    it('it should sign in the admin user and return a token', (done) => {
      const user = {
        email: 'markokaba99@gmail.com',
        password: 'johnbaby',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
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
        .post('/api/v1/auth/signin')
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
    it('it should create a new trip', (done) => {
      const newTrip = {
        bus_id: '1',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('bus_id');
          res.body.data.should.have.property('fare');
          res.body.data.should.have.property('trip_date');
          res.body.data.should.have.property('bus_capacity');
          res.body.data.should.have.property('origin');
          res.body.data.should.have.property('destination');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('created_by');
          done();
        });
    });
    it('it should not create a new trip because of administrative rights', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Authorized for only admins');
          done();
        });
    });
    it('it should not create a new trip because of expired token', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${expiredToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Token has expired');
          done();
        });
    });
    it('it should not create a new trip because of invalid token', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Authorization Denied.');
          done();
        });
    });
    it('it should not create a new trip because no token is supplied', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Please make sure your request has an authorization header');
          done();
        });
    });
    it('it should not create a new trip because no token type is not Bearer', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Digest ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('Invalid token type. Must be type Bearer');
          done();
        });
    });
    it('it should throw an error because of duplicate trip', (done) => {
      const newTrip = {
        bus_id: '1',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('This bus is already scheduled for the same trip');
          done();
        });
    });
    it('it should throw an error because of missing bus id', (done) => {
      const newTrip = {
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('bus_id is required and must be an integer');
          done();
        });
    });
    it('it should throw an error because of missing origin', (done) => {
      const newTrip = {
        bus_id: '1235',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('origin is required and must be a string');
          done();
        });
    });
    it('it should throw an error because of missing destination', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('destination is required and must be a string');
          done();
        });
    });
    it('it should throw an error because of missing trip date', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('trip_date is required');
          done();
        });
    });
    it('it should throw an error because of missing invalid date', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: 'jesus',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('trip_date is required');
          done();
        });
    });
    it('it should throw an error because of missing fare', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('fare is required');
          done();
        });
    });
    it('it should throw an error because of invalid fare', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: 'jesus',
      };
      chai
        .request(app)
        .post('/api/v1/trips')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('fare must be a number');
          done();
        });
    });
    it('it should get all trips as requested by admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data');
          done();
        });
    });
    it('it should get all trips as requested by normal user', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data');
          done();
        });
    });
    it('it should get all trips by origin', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/?origin=Ogoja')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data');
          done();
        });
    });
    it('it should get all trips by destination', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/?destination=Calabar')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data');
          done();
        });
    });
    it('it should not get trip because of wwrong origin', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/?origin=Cabar')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('No available results for your search');
          done();
        });
    });
    it('it should not get trip because of wwrong destination', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/?destination=Cabar')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('No available results for your search');
          done();
        });
    });
    it('Admin should be able to cancel a trip', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('data');
          res.body.data.should.have
            .property('message')
            .eql('Trip cancelled successfully');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('bus_id');
          res.body.data.should.have.property('fare');
          res.body.data.should.have.property('trip_date');
          res.body.data.should.have.property('bus_capacity');
          res.body.data.should.have.property('origin');
          res.body.data.should.have.property('destination');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('created_by');
          done();
        });
    });
    it('Admin should not be able to cancel a trip that does\'t exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/20')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('This trip doesn\'t exist');
          done();
        });
    });
    it('Regular users should not be able to cancel a trip that does\'t exist', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('Authorized for only admins');
          done();
        });
    });
  });
});
