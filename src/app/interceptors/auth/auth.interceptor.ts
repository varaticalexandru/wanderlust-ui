import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // console.log('Request');
  // console.log(req);
  
  
  return next(req);
};
