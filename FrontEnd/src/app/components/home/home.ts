import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Sidebar } from "../sidebar/sidebar";

@Component({
  selector: 'app-home',
  imports: [RouterLink, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
