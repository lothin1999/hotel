export class CustomerResponse {
  id!: number;
  email?: string | null;
  displayName!: string;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  provider!: string;
  gender?: string | null;
  nationality?: string | null;
  specificNationality?: string | null;
  idDocumentType?: string | null;
  idDocumentNumber?: string | null;
  idDocumentPhotoUrl?: string | null;
  driverLicenseNumber?: string | null;
  driverLicensePhotoUrl?: string | null;
  helmetSizeRider?: string | null;
  helmetSizePassenger?: string | null;
  ridingExperience?: string | null;
  transferRequest?: string | null;
  createdAt!: string;
}
