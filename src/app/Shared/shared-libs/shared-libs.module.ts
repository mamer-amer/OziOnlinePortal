import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TreeviewModule } from 'ngx-treeview';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  
    FormsModule,
    TreeviewModule.forRoot(),
    NgxUiLoaderModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      // set defaults here
    }),
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: true,
      closeButton:true
    })
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    TreeviewModule,
    FormsModule,
    HttpClientModule,
    ConfirmationPopoverModule,
    ToastrModule,
    NgMultiSelectDropDownModule
  ],
  providers: []
})
export class SharedLibsModule { }
