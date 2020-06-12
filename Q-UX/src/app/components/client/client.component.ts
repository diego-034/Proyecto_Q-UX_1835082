import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients/clients.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: any[] = [];
  constructor(private clientsService:ClientsService) { 
    this.clientsService.getClientes()
    .subscribe((data:any) => {
      console.log(data.data)
      this.clients=data.data;
    })
  }
  ngOnInit(): void {
  }

}
