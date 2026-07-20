import { Customer } from '@prisma/client';
import { CustomerResponse } from '../responses/customer.response';

export class CustomerMapper {
  static toResponse(customer: Customer): CustomerResponse {
    return {
      id: customer.id,
      email: customer.email,
      displayName: customer.displayName,
      phoneNumber: customer.phoneNumber,
      avatarUrl: customer.avatarUrl,
      provider: customer.provider,
      gender: customer.gender,
      nationality: customer.nationality,
      specificNationality: customer.specificNationality,
      idDocumentType: customer.idDocumentType,
      idDocumentNumber: customer.idDocumentNumber,
      idDocumentPhotoUrl: customer.idDocumentPhotoUrl,
      driverLicenseNumber: customer.driverLicenseNumber,
      driverLicensePhotoUrl: customer.driverLicensePhotoUrl,
      helmetSizeRider: customer.helmetSizeRider,
      helmetSizePassenger: customer.helmetSizePassenger,
      ridingExperience: customer.ridingExperience,
      transferRequest: customer.transferRequest,
      createdAt: customer.createdAt.toISOString(),
    };
  }

  static toResponseCollection(customers: Customer[]): CustomerResponse[] {
    return customers.map(customer => this.toResponse(customer));
  }
}
