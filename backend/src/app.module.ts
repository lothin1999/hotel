import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserTypeModule } from './modules/user-type/user-type.module';
import { UserDeviceModule } from './modules/user-device/user-device.module';
import { UserLogModule } from './modules/user-log/user-log.module';
import { CustomersModule } from './modules/customers/customers.module';
import { HeroModule } from './modules/hero/hero.module';
import { AboutModule } from './modules/about/about.module';
import { WellnessModule } from './modules/wellness/wellness.module';
import { SuitesModule } from './modules/suites/suites.module';
import { BikesModule } from './modules/bikes/bikes.module';
import { MotorCategoriesModule } from './modules/motor-categories/motor-categories.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { DiningModule } from './modules/dining/dining.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { SocialLinksModule } from './modules/social-links/social-links.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { TreatmentsModule } from './modules/treatments/treatments.module';
import { RoutesModule } from './modules/routes/routes.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    UserTypeModule,
    UserDeviceModule,
    UserLogModule,
    ProductsModule,
    CustomersModule,
    HeroModule,
    AboutModule,
    WellnessModule,
    SuitesModule,
    BikesModule,
    MotorCategoriesModule,
    BookingsModule,
    ExperiencesModule,
    DiningModule,
    GalleryModule,
    SocialLinksModule,
    TestimonialsModule,
    TreatmentsModule,
    RoutesModule,
    ReportsModule,
    SettingsModule,
  ],
})
export class AppModule {}
