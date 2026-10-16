import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// Importa ng-icons y los iconos específicos que vayas a usar
import { provideIcons } from '@ng-icons/core';
import { 
  lucideTrash2, 
  lucidePencil, 
  lucidePlus, 
  lucideBriefcase, 
  lucideCode, 
  lucideMail, 
  lucideCalendar,
  lucideAward,
  lucideFileText,
  lucideSearch,
  lucideRocket,
  lucideRefreshCw 
} from '@ng-icons/lucide';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled' }) 
    ),
     provideHttpClient(),
     
    provideIcons({ 
      lucideTrash2, 
      lucidePencil, 
      lucidePlus, 
      lucideBriefcase, 
      lucideCode, 
      lucideMail, 
      lucideCalendar,
      lucideAward,
      lucideFileText,
      lucideSearch,
      lucideRocket,
      lucideRefreshCw 
    })
  ]
};
