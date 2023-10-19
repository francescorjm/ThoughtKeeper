import app from './server';

const server = app.listen(app.get('port'), () => {
  console.log(`SERVER ON PORT ${app.get('port')}`);
});

export { app, server };
