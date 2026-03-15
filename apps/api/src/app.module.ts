import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

// Config
import {
  databaseConfig,
  jwtConfig,
  redisConfig,
  paystackConfig,
  stellarConfig,
} from './config';

// Common
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { RolesGuard } from './common/guards/roles.guard';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { InvoicesModule } from './modules/invoices/invoice.module';
import { InventoryModule } from './modules/inventory/Inventory.module';
import { PayrollModule } from './modules/payroll/Payroll.module';
import { NotificationsModule } from './modules/notifications/Notifications.module';
import { PaymentsModule } from './modules/payments/Payments.module';

@Module({
  imports: [
    // ── Config ──
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        jwtConfig,
        redisConfig,
        paystackConfig,
        stellarConfig,
      ],
      envFilePath: ['.env.local', '.env'],
    }),

    // ── Database ──
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.getOrThrow<TypeOrmModuleOptions>('database'),
    }),

    // ── Rate limiting ──
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),

    // ── Cron jobs ──
    ScheduleModule.forRoot(),

    // ── BullMQ ──
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('redis.host'),
          port: config.get('redis.port'),
          password: config.get('redis.password'),
        },
      }),
    }),

    // ── Feature modules ──
    AuthModule,
    UsersModule,
    TenantsModule,
    CustomersModule,
    InvoicesModule,
    ExpensesModule,
    InventoryModule,
    PayrollModule,
    NotificationsModule,
    PaymentsModule,
    ReportsModule,
  ],

  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
