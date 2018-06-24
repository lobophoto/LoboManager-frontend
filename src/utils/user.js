
export const setUser = (user) => {
  localStorage['user'] = JSON.stringify(user);
}

export const getUser = () => {
  let user = null;
  try{
    user = JSON.parse(localStorage['user']);
  }catch(e){
    console.log(e);
  }
  return user;
}