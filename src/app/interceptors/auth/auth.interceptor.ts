import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
<<<<<<< HEAD

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
=======
  
  // console.log('Request');
  // console.log(req);
  
  
  return next(req);
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
};
