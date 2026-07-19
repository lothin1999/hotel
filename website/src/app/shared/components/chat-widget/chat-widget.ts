import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

export interface ChatMessage {
  id: string;
  sender: 'hotel' | 'customer';
  senderName: string;
  avatar?: string;
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.html',
  styleUrls: ['./chat-widget.scss']
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;

  isOpen = false;
  unreadCount = 1;
  isTyping = false;
  userMessageText = '';
  hasOpenedBefore = false;
  private isBrowser: boolean;

  messages: ChatMessage[] = [];

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Initial greeting from Hotel Concierge
    this.messages.push({
      id: 'msg_greet_1',
      sender: 'hotel',
      senderName: 'Isabelle Moreau · Chief Concierge',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
      text: 'Welcome to Ankor Book Estates & Motorworks 🏛️✨ I am Isabelle, your Private Concierge. How may I assist with your stay, villa selection, or motorcycle fleet today?',
      timestamp: this.getFmtTime(),
      quickReplies: [
        'Reserve a Luxury Suite 🛋️',
        'Motorcycle Fleet & Requirements 🏍️',
        'Helipad & Yacht Transfer 🚁',
        'Michelin Gastronomy Dining 🍽️'
      ]
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      this.hasOpenedBefore = true;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  closeChat(): void {
    this.isOpen = false;
  }

  sendMessage(textToSend?: string): void {
    const text = textToSend || this.userMessageText.trim();
    if (!text) return;

    const user = this.authService.currentUser;
    const userName = user?.displayName || 'Valued Guest';

    // 1. Add Customer Message
    const customerMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'customer',
      senderName: userName,
      text: text,
      timestamp: this.getFmtTime()
    };

    this.messages.push(customerMsg);
    if (!textToSend) {
      this.userMessageText = '';
    }

    // 2. Trigger Concierge Typing Indicator & Auto-Response
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
      this.generateConciergeResponse(text);
    }, 1200);
  }

  sendQuickReply(replyText: string): void {
    this.sendMessage(replyText);
  }

  private generateConciergeResponse(query: string): void {
    const q = query.toLowerCase();
    let replyText = '';
    let quickReplies: string[] | undefined;

    if (q.includes('suite') || q.includes('room') || q.includes('stay') || q.includes('villa') || q.includes('reserve')) {
      replyText = 'Our resort features 6 handcrafted luxury sanctuaries ranging from our Obsidian Garden Suite to the 400m² Imperial Residence. Would you like me to direct you to our live reservation widget?';
      quickReplies = ['Go to Booking Widget 📅', 'View Suites Catalog 🏛️'];
    } else if (q.includes('moto') || q.includes('bike') || q.includes('license') || q.includes('helmet') || q.includes('fleet')) {
      replyText = 'Our stable features 16 competition-grade motorcycles including Ducati Scrambler 800 and Harley-Davidson Pan America. For motor rentals, guests present a valid Driver’s License and Khmer ID or Passport. Complimentary helmets are sized at check-in.';
      quickReplies = ['View Fleet Machines 🏍️', 'Reserve Moto Stay 🔑'];
    } else if (q.includes('transfer') || q.includes('helipad') || q.includes('yacht') || q.includes('airport') || q.includes('arrival')) {
      replyText = 'We provide bespoke arrivals via Rolls-Royce Phantom chauffeur, private yacht from ocean ports, or direct landing at our Private Helipad. Our concierge team manages all flight and marine logistics.';
      quickReplies = ['Request Private Transfer 🚁', 'Contact Concierge Desk 📞'];
    } else if (q.includes('dining') || q.includes('food') || q.includes('michelin') || q.includes('restaurant') || q.includes('chef')) {
      replyText = 'Executive Chef Jean-Luc Vasquez curates Michelin-starred Khmer-French gastronomy at L’Ankor Dining Room. Complimentary table allocations are reserved for all stay guests.';
      quickReplies = ['View Dining Menu 🍽️', 'Reserve Table 🥂'];
    } else if (q.includes('booking widget') || q.includes('go to booking')) {
      replyText = 'Sailing to our secure reservation widget now! You can configure your stay dates, villa choice, or motorcycle package right away.';
      this.scrollToSection('booking');
    } else if (q.includes('view fleet')) {
      replyText = 'Scrolling to our Motorcycle Fleet stable!';
      this.scrollToSection('fleet');
    } else if (q.includes('view suites')) {
      replyText = 'Escorting you to our Curated Sanctuaries gallery!';
      this.scrollToSection('suites');
    } else {
      replyText = 'Thank you for contacting Ankor Book Concierge! Our team is dedicated to providing an extraordinary sanctuary experience. How else may I assist your itinerary today?';
      quickReplies = ['Reserve a Suite 🛋️', 'Motorcycle Fleet 🏍️', 'Contact Front Desk ☎️'];
    }

    this.messages.push({
      id: 'msg_hotel_' + Date.now(),
      sender: 'hotel',
      senderName: 'Isabelle Moreau · Chief Concierge',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
      text: replyText,
      timestamp: this.getFmtTime(),
      quickReplies
    });
  }

  private scrollToSection(sectionId: string): void {
    if (this.isBrowser) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatScrollContainer) {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  private getFmtTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const fmtHours = hours % 12 || 12;
    const fmtMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${fmtHours}:${fmtMinutes} ${ampm}`;
  }
}
