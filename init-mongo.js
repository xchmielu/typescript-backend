db.createCollection('auth');
db.createUser({
    user: 'admin',
    pwd: 'secret',
    roles: [{ role: 'dbOwner', db: 'auth' }]
});
