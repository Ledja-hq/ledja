import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { tenantId?: string };
      body?: Record<string, unknown>;
      tenantId?: string;
    }>();
    const { user } = request;

    if (!user?.tenantId) {
      throw new ForbiddenException('Tenant context missing');
    }

    if (request.body) request.body.tenantId = user.tenantId;
    request.tenantId = user.tenantId;

    return true;
  }
}
