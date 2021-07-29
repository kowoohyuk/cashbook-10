import User from '../models/user';

const validationEmail = (email: string): boolean =>
  !/([a-zA-Z0-9\-\_])+@+([a-zA-Z])+\.+([a-zA-Z])/i.test(email);

export const insertUser = async (email: string, pw: string) => {
  if (!validationEmail(email)) return null;
  const insertUserResult = await User.create({
    email,
    pw,
  });
  return insertUserResult;
};

export const selectUser = async (email: string, pw: string) => {
  const user: User = await User.findOne({
    where: { email, pw },
    attributes: ['id', 'email', 'name'],
  });
  return user;
};
