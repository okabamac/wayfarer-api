import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

let userToken;
const newUser = {
  email: 'jerrylaw@gmail.com',
  first_name: 'Jerry',
  last_name: 'Law',
  password: 'password',
  confirm_password: 'password',
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
    it('it should book a seat', (done) => {
      const booking = {
        trip_id: 1,
        seat_number: '5',
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
          res.body.data.should.have.property('departure_time');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          done();
        });
    });
    it('it should throw error because of missing trip id', (done) => {
      const booking = {
        seat_number: '5',
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
    it('it should throw error because of missing seat number', (done) => {
      const booking = {
        trip_id: 1,
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('seat_number is required and must be an integer');
          done();
        });
    });
    it('it should throw error because trip is cancelled', (done) => {
      const booking = {
        trip_id: 2,
        seat_number: '5',
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
    it('it should throw error because seat has been booked', (done) => {
      const booking = {
        trip_id: 1,
        seat_number: '5',
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('This seat has been booked');
          done();
        });
    });
    // it('it should throw error because of multiple booking by the same user on the same trip', (done) => {
    //   const booking = {
    //     trip_id: 1,
    //     seat_number: '6',
    //   };
    //   chai
    //     .request(app)
    //     .post('/api/v1/bookings')
    //     .set('Authorization', `Bearer ${userToken}`)
    //     .send(booking)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('error').eql('Sorry, you can\'t book more than once on the same trip');
    //       done();
    //     });
    // });
    it('it should throw error because of invalid trip', (done) => {
      const booking = {
        trip_id: 16,
        seat_number: '6',
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
    it('it should throw error because of invalid seat number', (done) => {
      const booking = {
        trip_id: 1,
        seat_number: '20',
      };
      chai
        .request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('This seat number doesn\'t exist, choose between 1-18');
          done();
        });
    });
    it('it should throw error because of no more seats', (done) => {
      const booking = {
        trip_id: 3,
        seat_number: '2',
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
            .eql('This seat number doesn\'t exist, choose between 1-1');
          done();
        });
    });
  });
});
