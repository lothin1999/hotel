import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

export interface ChatMessage {
  id: string;
  sender: 'hotel' | 'customer';
  senderName: string;
  senderNameKey?: string;
  avatar?: string;
  text: string;
  textKey?: string;
  timestamp: string;
  quickReplies?: string[];
  quickRepliesKeys?: string[];
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
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
    public langService: LanguageService,
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
      senderNameKey: 'chat.name',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
      text: 'Welcome to Ankor Book Estates & Motorworks 🏛️✨ I am Isabelle, your Private Concierge. How may I assist with your stay, villa selection, or motorcycle fleet today?',
      textKey: 'chat.greeting',
      timestamp: this.getFmtTime(),
      quickReplies: [
        'Reserve a Luxury Suite 🛋️',
        'Motorcycle Fleet & Requirements 🏍️',
        'Helipad & Yacht Transfer 🚁',
        'Michelin Gastronomy Dining 🍽️'
      ],
      quickRepliesKeys: [
        'chat.qr.reserve',
        'chat.qr.fleet',
        'chat.qr.helipad',
        'chat.qr.dining'
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

  sendQuickReply(replyText: string, key?: string): void {
    const text = key ? this.langService.translate(key) : replyText;
    this.sendMessage(text);
  }

  private generateConciergeResponse(query: string): void {
    const q = query.toLowerCase();
    let replyText = '';
    let replyKey = '';
    let quickReplies: string[] | undefined;
    let quickRepliesKeys: string[] | undefined;

    // Check multilingual keywords
    const isSuite = q.includes('suite') || q.includes('room') || q.includes('stay') || q.includes('villa') || q.includes('reserve') ||
                    q.includes('បន្ទប់') || q.includes('ស្នាក់នៅ') || q.includes('កក់') ||
                    q.includes('客房') || q.includes('别墅') || q.includes('套房') || q.includes('预订') || q.includes('订房');

    const isMoto = q.includes('moto') || q.includes('bike') || q.includes('license') || q.includes('helmet') || q.includes('fleet') || q.includes('rider') ||
                   q.includes('ម៉ូតូ') || q.includes('មួក') || q.includes('បើកបរ') || q.includes('ក្បួន') ||
                   q.includes('摩托') || q.includes('重机') || q.includes('车队') || q.includes('头盔') || q.includes('驾照');

    const isTransfer = q.includes('transfer') || q.includes('helipad') || q.includes('yacht') || q.includes('airport') || q.includes('arrival') || q.includes('helicopter') ||
                       q.includes('ដឹកជញ្ជូន') || q.includes('ឧទ្ធម្ភាគចក្រ') || q.includes('នាវា') || q.includes('ព្រលាន') ||
                       q.includes('接送') || q.includes('直升机') || q.includes('游艇') || q.includes('机坪') || q.includes('码头') || q.includes('接机');

    const isDining = q.includes('dining') || q.includes('food') || q.includes('michelin') || q.includes('restaurant') || q.includes('chef') || q.includes('eat') || q.includes('menu') ||
                     q.includes('អាហារ') || q.includes('ញ៉ាំ') || q.includes('ចុងភៅ') || q.includes('មីនុយ') || q.includes('ភោជនីយដ្ឋាន') ||
                     q.includes('餐饮') || q.includes('美食') || q.includes('餐厅') || q.includes('主厨') || q.includes('米其林') || q.includes('菜单') || q.includes('饭');

    const isScrollBooking = q.includes('booking widget') || q.includes('go to booking') || q.includes('ទៅកាន់កន្លែងកក់') || q.includes('前往在线预订') || q.includes('calendar') || q.includes('📅');
    const isScrollFleet = q.includes('view fleet') || q.includes('មើលក្បួនម៉ូតូ') || q.includes('浏览重机') || q.includes('🏍️');
    const isScrollSuites = q.includes('view suites') || q.includes('មើលកាតាឡុក') || q.includes('浏览别墅') || q.includes('🏛️');

    if (isScrollBooking) {
      replyText = 'Sailing to our secure reservation widget now! You can configure your stay dates, villa choice, or motorcycle package right away.';
      replyKey = 'chat.responses.scrollBooking';
      this.scrollToSection('booking');
    } else if (isScrollFleet) {
      replyText = 'Scrolling to our Motorcycle Fleet stable!';
      replyKey = 'chat.responses.scrollFleet';
      this.scrollToSection('fleet');
    } else if (isScrollSuites) {
      replyText = 'Escorting you to our Curated Sanctuaries gallery!';
      replyKey = 'chat.responses.scrollSuites';
      this.scrollToSection('suites');
    } else if (isSuite) {
      replyText = 'Our resort features 6 handcrafted luxury sanctuaries ranging from our Obsidian Garden Suite to the 400m² Imperial Residence. Would you like me to direct you to our live reservation widget?';
      replyKey = 'chat.responses.suites';
      quickReplies = ['Go to Booking Widget 📅', 'View Suites Catalog 🏛️'];
      quickRepliesKeys = ['chat.responses.suitesQr.0', 'chat.responses.suitesQr.1'];
    } else if (isMoto) {
      replyText = 'Our stable features 16 competition-grade motorcycles including Ducati Scrambler 800 and Harley-Davidson Pan America. For motor rentals, guests present a valid Driver’s License and Khmer ID or Passport. Complimentary helmets are sized at check-in.';
      replyKey = 'chat.responses.moto';
      quickReplies = ['View Fleet Machines 🏍️', 'Reserve Moto Stay 🔑'];
      quickRepliesKeys = ['chat.responses.motoQr.0', 'chat.responses.motoQr.1'];
    } else if (isTransfer) {
      replyText = 'We provide bespoke arrivals via Rolls-Royce Phantom chauffeur, private yacht from ocean ports, or direct landing at our Private Helipad. Our concierge team manages all flight and marine logistics.';
      replyKey = 'chat.responses.transfer';
      quickReplies = ['Request Private Transfer 🚁', 'Contact Concierge Desk 📞'];
      quickRepliesKeys = ['chat.responses.transferQr.0', 'chat.responses.transferQr.1'];
    } else if (isDining) {
      replyText = 'Executive Chef Jean-Luc Vasquez curates Michelin-starred Khmer-French gastronomy at L’Ankor Dining Room. Complimentary table allocations are reserved for all stay guests.';
      replyKey = 'chat.responses.dining';
      quickReplies = ['View Dining Menu 🍽️', 'Reserve Table 🥂'];
      quickRepliesKeys = ['chat.responses.diningQr.0', 'chat.responses.diningQr.1'];
    } else {
      replyText = 'Thank you for contacting Ankor Book Concierge! Our team is dedicated to providing an extraordinary sanctuary experience. How else may I assist your itinerary today?';
      replyKey = 'chat.responses.default';
      quickReplies = ['Reserve a Suite 🛋️', 'Motorcycle Fleet 🏍️', 'Contact Front Desk ☎️'];
      quickRepliesKeys = ['chat.responses.defaultQr.0', 'chat.responses.defaultQr.1', 'chat.responses.defaultQr.2'];
    }

    this.messages.push({
      id: 'msg_hotel_' + Date.now(),
      sender: 'hotel',
      senderName: 'Isabelle Moreau · Chief Concierge',
      senderNameKey: 'chat.name',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&auto=format&fit=crop',
      text: replyText,
      textKey: replyKey,
      timestamp: this.getFmtTime(),
      quickReplies,
      quickRepliesKeys
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
