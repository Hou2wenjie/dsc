import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { AddressDeleteDialogComponent } from './address-delete-dialog.component';

@Component({
  selector: 'jhi-address',
  templateUrl: './address.component.html'
})
export class AddressComponent implements OnInit, OnDestroy {
  addresses: IAddress[];
  eventSubscriber: Subscription;

  constructor(protected addressService: AddressService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadPersionalInfo() {
    //this.addressService.find(id)
  }

  loadAll() {
    this.addressService.query().subscribe((res: HttpResponse<IAddress[]>) => {
      this.addresses = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInAddresses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAddress) {
    return item.id;
  }

  registerChangeInAddresses() {
    this.eventSubscriber = this.eventManager.subscribe('addressListModification', () => this.loadAll());
  }

  delete(address: IAddress) {
    const modalRef = this.modalService.open(AddressDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.address = address;
  }
}
