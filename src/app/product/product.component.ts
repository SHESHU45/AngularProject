import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../Services/product.service';
import { product } from './product';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl,Validators  } from '@angular/forms';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public modalRef?: BsModalRef;
  public modalTitle ='';
  public  btnText ='';
  public id = new FormControl('');
  public name = new FormControl('',Validators.required);
  public detail = new FormControl('',Validators.required);
  public price = new FormControl('',Validators.required);
  public stock = new FormControl('',Validators.required);
  public discount = new FormControl('',Validators.required);
  public products = [] as any;
  public selecteProducts = <any>{};
  public showError = false;
  constructor(private prodcutService: ProductService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getProductList();
  }


  getProductList() {
    this.prodcutService.productList()
      .subscribe(response => this.products = response);
      
  }

  addProduct(Product:product){
   
    
  }


  deleteProduct(id:any)
  {
    this.prodcutService.deleteProduct(id)
        .subscribe(response => this.getProductList());
  }


  openModal(template: TemplateRef<any>,product?:product) {
   
    if(product)
    {console.log(product);
      this.modalTitle='Update Product';
      this.btnText ='Update';
      this.id.setValue(product.id);
      this.name.setValue(product.name);
      this.detail.setValue(product.detail);
      this.price.setValue(product.price);
      this.stock.setValue(product.stock);
      this.discount.setValue(product.discount);
    }
    else
    {
      this.modalTitle='Add Product';
      this.btnText ='Add';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  save()
  {
    if(!this.name.value || !this.detail.value || !this.price.value|| !this.stock.value || !this.discount.value){
      this.showError = true;
      return;
    }
   if(this.btnText =='Update')
   {
      this.selecteProducts.id=this.id.value;
      this.selecteProducts.name=this.name.value;
      this.selecteProducts.detail=this.detail.value;
      this.selecteProducts.price=this.price.value;
      this.selecteProducts.stock=this.stock.value;
      this.selecteProducts.discount=this.discount.value;
      this.prodcutService.updateProduct(this.selecteProducts)
      .subscribe(response => {
        this.getProductList();
        this.showError = false;
        this.modalRef?.hide();
      });
     
   }
   else
   {
    this.selecteProducts.name=this.name.value;
      this.selecteProducts.detail=this.detail.value;
      this.selecteProducts.price=this.price.value;
      this.selecteProducts.stock=this.stock.value;
      this.selecteProducts.discount=this.discount.value;
      this.prodcutService.addProduct(this.selecteProducts)
        .subscribe(response => {
          this.getProductList();
          this.showError = false;
          this.modalRef?.hide();
        });
   } 
  }
  reset()
  { 
    this.id.reset();
    this.name.reset();
    this.detail.reset();
    this.price.reset();
    this.stock.reset();
    this.discount.reset();

  }
}
