import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GiftsService } from '../../services/gifts.service';
import { MercadoLibreService } from '../../services/mercadolibre.service';
import { Gift } from '../../interfaces';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css'],
})
export class GiftListComponent implements OnInit {
  gifts: Gift[] = []; 
  eventId: string = ''; 
  newGift: Gift = {
    id: '',
    name: '',
    description: '',
    isSelected: false,
    eventId: '',
  };

  products: any[] = []; 
  searchTerm: string = '';
  isLoading: boolean = false; 

  private routeSub: Subscription = new Subscription();

  constructor(
    private giftsService: GiftsService,
    private route: ActivatedRoute,
    private mercadoLibreService: MercadoLibreService
  ) {}

  ngOnInit(): void {
    
    this.routeSub = this.route.params.subscribe((params) => {
      this.eventId = params['eventId'];
      this.loadGifts();
    });
  }

  
  loadGifts(): void {
    if (this.eventId) {
      this.giftsService.getGiftsByEvent(this.eventId).subscribe((data: Gift[]) => {
        this.gifts = data;
      });
    }
  }

  
  addProductAsGift(product: any): void {
    const gift: Gift = {
      id: this.generateUniqueId(),
      name: product.title,
      description: `Producto de Mercado Libre - Precio: ${product.price}`,
      isSelected: false,
      eventId: this.eventId,
      permalink: product.permalink 
    };
  
    this.giftsService.addGift(gift).subscribe(() => {
      alert('Producto añadido como regalo');
      this.loadGifts(); 
    });
  }
  

 
  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  
  searchProducts(query: string): void {
    this.isLoading = true;
    this.mercadoLibreService.searchProducts(query).subscribe(
      (response: any) => {
        this.products = response.results;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al buscar productos:', error);
        this.isLoading = false;
      }
    );
  }

  
  onSearch(): void {
    if (this.searchTerm) {
      this.searchProducts(this.searchTerm);
    }
  }

  
  getGiftStatus(gift: Gift): string {
    return gift.isSelected ? 'No disponible' : 'Disponible';
  }

 
  getGuestWhoSelectedGift(gift: Gift): string {
   
    return gift.isSelected ? 'Seleccionado por: [Nombre del invitado]' : 'Disponible';
  }

  ngOnDestroy(): void {
    
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
