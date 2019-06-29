import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../server/app';

chai.use(chaiHttp);
chai.should();


const newUser = {
  email: 'okabamac@gmail.com',
  firs_name: 'Mac',
  last_name: 'Okaba',
  password: 'password',
  confirm_password: 'password',
};

describe('Test user login and signup', () => {
  /**
   * Test the POST /auth/signup endpoint
   */
  describe('POST /auth/signup', () => {
    it('it should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('is_admin').eql('false');
          done();
        });
    });
  });
});
