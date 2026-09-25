export type ViewType =
  | 'dashboard'
  | 'dashboard-operasional'
  | 'dashboard-ringkasan'
  | 'data-anggota'
  | 'simpanan-pokok'
  | 'simpanan-wajib'
  | 'simpanan-sukarela'
  | 'pengajuan-pinjaman'
  | 'angsuran-pinjaman'
  | 'riwayat-pinjaman'
  | 'laporan-keuangan'
  | 'pengaturan-akun';

export interface Member {
  id: string;
  name: string;
  memberNo: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'Aktif' | 'Menunggu Verifikasi' | 'Nonaktif';
  category: 'biasa' | 'luar-biasa' | 'pengurus';
  skor: string;
  initials: string;
  avatarBg: string;
  nik: string;
  simpananPokok: number;
  simpananWajib: number;
  simpananSukarela: number;
  totalPinjamanAktif: number;
  plafonMaksimal: number;
}

export interface Transaction {
  id: string;
  txNo: string;
  timestamp: string;
  date: string;
  time: string;
  memberName: string;
  memberNo: string;
  memberInitials: string;
  memberAvatarBg: string;
  type: string;
  category: 'angsuran' | 'simpanan-wajib' | 'simpanan-pokok' | 'simpanan-sukarela' | 'pencairan' | 'operasional';
  amount: number;
  isNegative?: boolean;
  channel: string;
  channelIcon: string;
  status: 'Lancar' | 'Lunas' | 'Menunggak' | 'Disetujui' | 'Kas Terverifikasi';
  overdueDays?: number;
  runningBalance?: number;
}

export interface LoanApplication {
  id: string;
  memberName: string;
  memberNo: string;
  score: string;
  initials: string;
  avatarBg: string;
  tenor: string;
  loanType: string;
  amount: number;
  status: 'Menunggu Verifikasi Pengurus' | 'Disetujui Surveyor' | 'Menunggu Verifikasi';
  statusColor: string;
  actionLabel: 'Review' | 'Cairkan';
  actionPrimary?: boolean;
}

export interface DueInstallment {
  id: string;
  memberName: string;
  memberNo: string;
  initials: string;
  avatarBg: string;
  loanType: string;
  installmentPeriod: string;
  amount: number;
  dueDate: string;
  statusNotice: string;
  isUrgent?: boolean;
}

export const FORMAT_RUPIAH = (val: number): string => {
  return 'Rp' + (val || 0).toLocaleString('id-ID');
};

