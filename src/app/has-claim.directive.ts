import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef} from "@angular/core";
import { SecurityService } from './services/security.service';
import { LocalStorageService } from './services/local-storage.service';
import { User } from './shared/models/User';

@Directive({
  selector: '[appHasClaim]'
})
export class HasClaimDirective {


  constructor(private templateRef : TemplateRef<any>,
              private viewContainer : ViewContainerRef,
              private securityService : SecurityService,
  ) { 
  }
  
  @Input("appHasClaim") set hasClaim(claimType: any) {
    let x = this.securityService.hasPermission(claimType);
    if (x){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainer.clear();
    }
  }
}
