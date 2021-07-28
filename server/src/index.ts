import express from 'express';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

