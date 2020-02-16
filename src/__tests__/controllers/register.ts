import app from '../../index';
import supertest from 'supertest';
const request = supertest(app);
import { connection } from '../../database';
import { User } from '../../models';
import faker from 'faker';
describe('Register User', () => {
    let sessionId = '';

    const { email, name, password } = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password()
    };

    beforeAll(async () => {
        await connection;
        await User.deleteMany({});
    });

    it('Should create user', async done => {
        await request
            .post('/register')
            .send({
                email,
                name,
                password,
                passwordConfrimation: password
            })
            .expect('Content-Type', /json/)
            .expect(201);
        done();
    });

    it('Should veritify user', async done => {
        const user = await User.find({});
        const { _id } = user[0];

        await request
            .get(`/veritify/${_id}`)
            .expect(200)
            .expect({ message: 'Email confirmed sucessfuly' });
        done();
    });

    it('Should login created user', async done => {
        const res = await request
            .post('/login')
            .send({
                email,
                password
            })
            .expect('Content-Type', /json/)
            .expect(200);

        sessionId = res.header['set-cookie'][0].split(';')[0];
        done();
    });

    it('Should not allow to use /register route if you are logged in', async done => {
        await request
            .post('/register')
            .set('Cookie', [sessionId])
            .send({})
            .expect(400)
            .expect({ message: 'You are already logged in' });
        done();
    });
    it('Should allow to use /logout route if you are logged in', async done => {
        await request
            .post('/logout')
            .set('Cookie', [sessionId])
            .expect(200)
            .expect({
                message: 'Sucessfully loged in'
            });
        done();
    });
});

describe('Register User - Failed Scenarios', () => {
    beforeAll(async () => {
        await connection;
        await User.deleteMany({});
    });

    const { badEmail, badPassword, email, name, password } = {
        badEmail: 'sampleemailgmail.com',
        badPassword: '123abcde',
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: `${faker.internet.password()}Ab1`
    };

    it('Should fail, because of wrong email', async done => {
        await request
            .post('/register')
            .send({
                email: badEmail,
                name,
                password,
                passwordConfrimation: password
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({
                message:
                    'ValidationError: "email" must be a valid email'
            });
        done();
    });

    it('Should fail, because of wrong password', async done => {
        await request
            .post('/register')
            .send({
                email,
                name,
                password: badPassword,
                passwordConfrimation: badPassword
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({
                message:
                    'ValidationError: Password must contains one upper case, one lowercase, one digit'
            });
        done();
    });

    it("Should fail, because of passwords doesn't match", async done => {
        await request
            .post('/register')
            .send({
                email,
                name,
                password: password,
                passwordConfrimation: `${password}2`
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({
                message:
                    'ValidationError: "passwordConfrimation" must be [ref:password]'
            });
        done();
    });

    it('Should fail, because of already taken email', async done => {
        await request.post('/register').send({
            email,
            name,
            password,
            passwordConfrimation: password
        });

        await request
            .post('/register')
            .send({
                email,
                name,
                password,
                passwordConfrimation: password
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ message: 'Invalid email' });

        done();
    });

    it("Should fail, because this useer doesn't exist in db", async done => {
        await request
            .post('/login')
            .send({
                email: faker.internet.email(),
                password: `${faker.internet.password()}Ab1`
            })
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ message: 'Incorrect email or password' });

        done();
    });

    it('Should fail, because passwords doesnt match', async done => {
        await request
            .post('/login')
            .send({
                email,
                password: `${faker.internet.password()}Ab1`
            })
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ message: 'Incorrect email or password' });

        done();
    });

    it('Should fail, because verification link was wrong', async done => {
        await request
            .get('/veritify/5e46f88e6404bb31806766c5')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({ message: 'This link is broken' });

        done();
    });
    it('Should fail, because user dont verified an account', async done => {
        await request.post('/register').send({
            email,
            name,
            password,
            passwordConfrimation: password
        });

        await request
            .post('/login')
            .send({
                email,
                password
            })
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({
                message: 'Confirm email first'
            });

        done();
    });
    it('Should fail, because you can accees /logout when you are logged in', async done => {
        await request
            .post('/logout')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect({ message: 'You must be logged in' });

        done();
    });
});
describe('Errors', () => {
    it('404 link', async done => {
        await request
            .get('/test')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect({
                message: 'Page not found'
            });

        done();
    });
});
