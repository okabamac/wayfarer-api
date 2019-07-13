/* eslint-disable camelcase */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

let userToken;
let adminToken;
let new_trip_id;
const newUser = {
  email: 'jerrylaw@gmail.com',
  first_name: 'Jerry',
  last_name: 'Law',
  password: 'password',
  is_admin: false,
};

describe('Test the booking endpoint', () => {
  /**
   * Test the POST /auth/signup endpoint
   */
  describe('POST /booking', () => {
    it('it should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('user_id');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('is_admin').eql(false);
          done();
        });
    });
    it('it should sign in the normal user and return a token', (done) => {
      const user = {
        email: 'jerrylaw@gmail.com',
        password: 'password',
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
    it('it should sign in the admin user and return a token', (done) => {
      const adminLogin = {
        email: 'markokaba99@gmail.com',
        password: 'johnbaby',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(adminLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          const { token } = res.body.data;
          adminToken = token;
          done();
        });
    });
    it('it should book a seat', (done) => {
      const booking = {
        trip_id: 1
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('booking_id');
          res.body.data.should.have.property('user_id');
          res.body.data.should.have.property('trip_id');
          res.body.data.should.have.property('bus_id');
          res.body.data.should.have.property('trip_date');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          done();
        });
    });
    it('it should throw error because of missing trip id', (done) => {
      const booking = {
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('trip_id is required and must be an integer');
          done();
        });
    });
    it('it should throw error because trip is cancelled', (done) => {
      const booking = {
        trip_id: 2,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('This trip has been cancelled');
          done();
        });
    });
    it('it should throw error because of invalid trip', (done) => {
      const booking = {
        trip_id: 16
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('This trip is not available');
          done();
        });
    });
    it('it should throw error because of no more seats', (done) => {
      const booking = {
        trip_id: 3,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('No more available seats on this trip');
          done();
        });
    });
    it('admin should be able to see all the bookings', (done) => {
      chai
        .request(app)
        .get('/api/v1/bookings')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('user should be able to see all his/her bookings', (done) => {
      chai
        .request(app)
        .get('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('user should be able to delete a user\'s booking', (done) => {
      chai
        .request(app)
        .delete('/api/v1/bookings/3')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a
            .property('message')
            .eql('Booking deleted successfully');
          done();
        });
    });
    it('user should not be able to delete a user\'s booking because of access or invalid booking', (done) => {
      chai
        .request(app)
        .delete('/api/v1/bookings/6')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('You don\'t seem to have access to this booking');
          done();
        });
    });
    it('it should create a new trip', (done) => {
      const newTrip = {
        bus_id: '1',
        origin: 'Ibadan',
        destination: 'Okuku',
        trip_date: '12-06-2018',
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
          res.body.data.should.have.property('trip_id');
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
    it('it should get the created trip id and store it', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/?destination=Okuku')
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data[0].should.have.property('trip_id');
          new_trip_id = res.body.data[0].trip_id;
          done();
        });
    });
    it('it should book a seat', (done) => {
      const booking = {
        trip_id: new_trip_id,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('booking_id');
          res.body.data.should.have.property('user_id');
          res.body.data.should.have.property('trip_id');
          res.body.data.should.have.property('bus_id');
          res.body.data.should.have.property('trip_date');
          res.body.data.should.have.property('created_on');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          done();
        });
    });
  });
});
