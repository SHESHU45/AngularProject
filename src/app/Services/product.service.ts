import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../product/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http:HttpClient) {

   }
  private url ='http://localhost/product-api/api/products';
  private myToken ='Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNWE4ZjlhYzBkMGNlNzdjN2VhNjk2YWNkODMzMGFlMDk5NmEyZjZlODljZTc0NzhjN2VjN2JhYWEyZDc5MGQ5YjJjNGI1NWZmYmE3NjEyOWMiLCJpYXQiOjE2NjU5MzUyMjUuMzI2MDI5LCJuYmYiOjE2NjU5MzUyMjUuMzI2MDMzLCJleHAiOjE2OTc0NzEyMjUuMzExNjcxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dhuaxW3MaK5psSP9rmVTy7TY83wc87BhdkClQF2oKYwUdnp_XBmcYLVntAdUJcNhspNwfDv3vRvc7SP27nDin2_iEdwcWwMOhCadCeJd8yQGpRfZeglvcjXIUuxZyBM8cPvOXwU_qXn9Bv1qSAck5_Ro93ur5dRP8MeSZi3_Jer2nxKaUuB41d-U0Vy4ufluUg2qUs1TLk9dJoTguc51HuYSDQD46qYPZiUSskr-jc04E30PzS-iBUwZxVkLd6vmdqtVbcWWoYfh9ga4lKbOXTjIyn9nsIhF8SIV3CaqBv7u5whM2VgJBOA5eCeQNtwlMwG5N5atdcO5-rQv2IQJTJ0QJYCrwII-sGSIWcNK47k6dy3MDL9pc2AXWOafnpvy0r75WxjM7HT3VSGnRXnma3mPqY0R1p38YkvY3Y71R9kSIZkg4efRlLi7EI-KKxFDafJlJddIpx9MT17gEt0Pvn1VrDfiEc8sq64Qb-1D_bcxuQgIlD94OvOnKqOVIVOQ1uqDbKZhEa3k127oxxaVKxIQhXGZdIhRSdp_WIxYGc9YHvt-XnancfJ2QtpEJNq1wM_4iMNDtXHbEzmBysIFk5lsm4wzccS9nxlA-DMNB_l6opExvaPVO0mvEiwXqt3YaP349-TajJOkMb4x0HUbhS37iDFjsvgsZHszYaW7qZU';
  productList()
  {
    return this.http.get(this.url);
  }

  addProduct(product:product)
  {
    const headers = { 'Authorization': this.myToken };
    return this.http.post<product>(this.url,product, { headers });
  }

  updateProduct(product:product)
  {
    const headers = { 'Authorization': this.myToken };
    return this.http.put<product>(this.url+'/'+product.id,product, { headers });
  }

  deleteProduct(id:any)
  {
    const headers = { 'Authorization': this.myToken };
    return this.http.delete<boolean>(this.url+'/'+id, { headers });
  }
}
