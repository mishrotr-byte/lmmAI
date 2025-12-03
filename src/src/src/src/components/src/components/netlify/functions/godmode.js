const bcrypt = require('bcryptjs');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const body = JSON.parse(event.body || '{}');
  const { password } = body;
  const hash = process.env.GODMODE_PASSWORD_HASH;
  if(!hash) return { statusCode: 500, body: JSON.stringify({ ok:false, error:'GODMODE NOT CONFIGURED'})};
  const ok = await bcrypt.compare(password, hash);
  if(!ok) return { statusCode: 401, body: JSON.stringify({ ok:false })};
  // можно генерировать временный JWT – но для MVP просто возвращаем ok
  return { statusCode: 200, body: JSON.stringify({ ok:true, admin:true })};
};
