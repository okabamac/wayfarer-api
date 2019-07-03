import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../server/app';

chai.use(chaiHttp);
chai.should();

let theToken;

describe('Test for trips creation and get', () => {
  /**
   * Test for trips
   */
  describe('Test for trips', () => {
    it('it should sign in the user and return a token', (done) => {
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

          theToken = token;
          done();
        });
    });
    it('it should create a new trip', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('trip_id');
          res.body.data.should.have.property('bus_id');
          res.body.data.should.have.property('fare');
          res.body.data.should.have.property('trip_date');
          res.body.data.should.have.property('origin');
          res.body.data.should.have.property('origin');
          res.body.data.should.have.property('destination');
          res.body.data.should.have.property('created_by');
          done();
        });
    });
    it('it should throw an error because of duplicate trip', (done) => {
      const newTrip = {
        bus_id: '1235',
        origin: 'Ogun',
        destination: 'Oyo',
        trip_date: '12-06-2019',
        fare: '12.666',
      };
      chai
        .request(app)
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('bus_id is required');
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('origin is required');
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('destination is required');
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
        .send(newTrip)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('error')
            .eql('fare is required');
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
        .post('/api/v1/trips/create')
        .set('Authorization', theToken)
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
  });
});
