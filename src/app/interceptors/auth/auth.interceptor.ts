import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  console.log(req);  

  if (!req.url.includes('localhost')){
    return next(req);
  }
  
  const token = localStorage.getItem('token');
  if (token == null) { 
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(authReq);
  
  return next(authReq);
};
