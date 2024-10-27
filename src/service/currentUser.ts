'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export const currentUser = async () => {
  const token = cookies().get('accessToken')?.value;
  let user;

  if (token) {
    user = jwtDecode(token);
  }

  return user;
};
