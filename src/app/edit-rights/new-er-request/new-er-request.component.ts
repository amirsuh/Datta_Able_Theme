import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CreateProposalService } from '../services/create-proposal.service';

@Component({
  selector: 'app-new-er-request',
  templateUrl: './new-er-request.component.html',
  styleUrls: ['./new-er-request.component.scss']
})
export class NewErRequestComponent implements OnInit {

  name: string;
  selectCategoryForm: FormGroup
  submitted: boolean = false;
  selectedCategory: String;
  categoryData;
  subCategory = [];
  reason: Array<any>;
  isReason: boolean = false;
  isFundTransfer: boolean = false;
  isNTUBulk: boolean = false;
  proposalData;
  isOther = false;
  loading = false;
  constructor(private fb: FormBuilder, private createPService: CreateProposalService, private router: Router,) { }

  ngOnInit(): void {

    this.createPService.getProposalData().subscribe(res => {
      if (localStorage.getItem('userDetails')) {
        let grprole = JSON.parse(localStorage.getItem('userDetails'));
        for (let i = 0; i < grprole.groupRole.length; i++) {

          if (grprole.groupRole[i].rleCode == 'NO_PAUSE') {
            for (let j = 0; j < res.length; j++) {
              if (res[j].categoryCode === 'ER_CAT_PAU') {
                res.splice(j, 1);
              }
            }
            this.categoryData = res;
          }
          else {
            this.categoryData = res;
          }
        }
      }

    })
    this.selectCategoryForm = this.fb.group({
      categoryId: ['', Validators.required],
      proposalId: ['', Validators.required],
      subCategoryID: [''],
      reason: [''],
      fromNumber: [''],
      toNumber: [''],
    });
  }


  submitErRequest(data) { }

  submitCategory(data) {

    this.submitted = true;
    if (this.selectCategoryForm.invalid) {
      return
    }
    let formData: NavigationExtras = this.selectCategoryForm.value
    this.createPService.setCategoryForm(this.selectCategoryForm.value);
    this.router.navigate(['/edit-rights/save-edit-rights-request/', data],
      { skipLocationChange: true }
      // {state: { newErRequestData: formData }}
    )
    this.loading = true;
  }
  get f() { return this.selectCategoryForm.controls; }

  changeCategory(category) {

    if (category != '') {
      this.isFundTransfer = false;

      switch (category) {
        case 'ER_CAT_PAU': {
          this.isReason = true;
          this.isFundTransfer = false;
          this.selectCategoryForm.controls['reason'].setValidators([Validators.required]);
          this.selectCategoryForm.controls['subCategoryID'].clearValidators();
          this.selectCategoryForm.controls['fromNumber'].clearValidators();
          this.selectCategoryForm.controls['toNumber'].clearValidators();
          this.selectCategoryForm.controls['toNumber'].setValue('')
          this.selectCategoryForm.controls['reason'].setValue('')
          this.selectCategoryForm.controls['subCategoryID'].setValue('')
          this.reason = this.categoryData.find(data => data.categoryCode == category).reasons;
          break;
        }
        case 'ER_CAT_FT': {
          this.isReason = false;
          this.isFundTransfer = true
          this.selectCategoryForm.controls['subCategoryID'].setValidators([Validators.required]);
          this.selectCategoryForm.controls['fromNumber'].setValidators([Validators.required]);
          this.selectCategoryForm.controls['toNumber'].setValidators([Validators.required]);
          this.selectCategoryForm.controls['toNumber'].setValue(this.selectCategoryForm.controls['proposalId'].value)
          this.selectCategoryForm.controls['reason'].clearValidators();
          this.selectCategoryForm.controls['reason'].setValue('')
          this.selectCategoryForm.controls['subCategoryID'].setValue('')
          this.subCategory = this.categoryData.find(data => data.categoryCode == category).subCategories;
          break;

        }
        case 'ER_CAT_OTH': {
          this.isReason = false;
          this.subCategory = [];
          this.selectCategoryForm.controls['subCategoryID'].clearValidators();
          this.selectCategoryForm.controls['fromNumber'].clearValidators();
          this.selectCategoryForm.controls['toNumber'].clearValidators();
          this.selectCategoryForm.controls['reason'].clearValidators();
          this.selectCategoryForm.controls['subCategoryID'].setValue('')
          this.selectCategoryForm.controls['fromNumber'].setValue('')
          this.selectCategoryForm.controls['toNumber'].setValue('')
          break;
        }

        default: {
          this.isReason = false;
          this.isOther = false;
          this.selectCategoryForm.controls['subCategoryID'].setValidators([Validators.required]);
          this.selectCategoryForm.controls['reason'].clearValidators();
          this.selectCategoryForm.controls['fromNumber'].clearValidators();
          this.selectCategoryForm.controls['toNumber'].clearValidators();
          this.selectCategoryForm.controls['reason'].setValue('')
          this.selectCategoryForm.controls['fromNumber'].setValue('')
          this.selectCategoryForm.controls['toNumber'].setValue('')
          this.selectCategoryForm.controls['subCategoryID'].setValue('')
          this.subCategory = this.categoryData.find(data => data.categoryCode == category).subCategories;
          break;
        }
      }
    }

    else {
      this.isReason = false;
      this.isFundTransfer = false;
      this.subCategory = [];
    }

  }

}
