import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SupplierList } from './components/supplier/supplier-list/supplier-list';

export const routes: Routes = [
    {path: '', component: Home, title: 'Sistema Simples'},
    {path: 'supplier', component: SupplierList, title: 'supplier'}
];
