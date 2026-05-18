import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SupplierList } from './components/supplier/supplier-list/supplier-list';
import { ClientList } from './components/client/client-list/client-list';

export const routes: Routes = [
    {path: '', component: Home, title: 'home page'},
    {path: 'supplier', component: SupplierList, title: 'supplier'},
    {path: 'client', component: ClientList, title: 'client'}
];
