import React, { useState } from 'react';
import { Transaction, Member, FORMAT_RUPIAH } from '../types';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  members,
  onAddTransaction,
}) => {
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [category, setCategory] = useState<'angsuran' | 'simpanan-wajib' | 'simpanan-pokok' | 'simpanan-sukarela' | 'operasional'>('angsuran');
  const [amount, setAmount] = useState('2500000');
  const [channel, setChannel] = useState('Transfer Bank BCA');
  const [notes, setNotes] = useState('Pembayaran angsuran rutin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedMember = members.find((m) => m.id === memberId) || members[0];
    const parsedAmount = parseInt(amount.replace(/\D/g, ''), 10) || 0;

    let typeText = 'Setoran Simpanan Wajib';
    if (category === 'angsuran') typeText = 'Angsuran Pinjaman Anggota';
    else if (category === 'simpanan-pokok') typeText = 'Setoran Simpanan Pokok';
    else if (category === 'simpanan-sukarela') typeText = 'Setoran Simpanan Sukarela';
    else if (category === 'operasional') typeText = 'Pengeluaran Kas Operasional';

    const txNo = `TX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    onAddTransaction({
      txNo,
      timestamp: '15 Sep 2025, 14:10 WIB',
      date: '15 Sep 2025',
      time: '14:10 WIB',
      memberName: selectedMember ? selectedMember.name : 'Anggota Koperasi',
      memberNo: selectedMember ? selectedMember.memberNo : 'AG-2025-0001',
      memberInitials: selectedMember ? selectedMember.initials : 'AK',
      memberAvatarBg: selectedMember ? selectedMember.avatarBg : 'bg-[#d6e3ff] text-[#004287]',
      type: typeText,
      category,
      amount: parsedAmount,
      isNegative: category === 'operasional',
      channel,
      channelIcon: channel.includes('Transfer') ? 'credit_card' : channel.includes('QRIS') ? 'qr_code_2' : 'point_of_sale',
      status: 'Lunas',
      runningBalance: 1034900000,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A]/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#737782] hover:text-[#151c27] p-1 rounded-lg hover:bg-[#f0f3ff]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 text-[#004287] mb-4">
          <span className="material-symbols-outlined text-[24px]">payments</span>
          <h2 className="text-[18px] font-bold text-[#151c27]">
            Catat Transaksi Kas Baru
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[13px] font-medium text-[#424751] mb-1">
              Pilih Anggota Koperasi
            </label>
            <select
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] bg-[#f0f3ff] focus:bg-white focus:outline-none focus:border-[#004287]"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.memberNo}) - Skor: {m.skor}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#424751] mb-1">
              Jenis Transaksi
            </label>
            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <button
                type="button"
                onClick={() => setCategory('angsuran')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                  category === 'angsuran'
                    ? 'border-[#004287] bg-[#e7eefe] text-[#004287] font-semibold'
                    : 'border-[#c2c6d3] text-[#424751]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">payments</span>
                <span>Angsuran Pinjaman</span>
              </button>
              <button
                type="button"
                onClick={() => setCategory('simpanan-wajib')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                  category === 'simpanan-wajib'
                    ? 'border-[#004287] bg-[#e7eefe] text-[#004287] font-semibold'
                    : 'border-[#c2c6d3] text-[#424751]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                <span>Simpanan Wajib</span>
              </button>
              <button
                type="button"
                onClick={() => setCategory('simpanan-sukarela')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                  category === 'simpanan-sukarela'
                    ? 'border-[#004287] bg-[#e7eefe] text-[#004287] font-semibold'
                    : 'border-[#c2c6d3] text-[#424751]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">savings</span>
                <span>Simpanan Sukarela</span>
              </button>
              <button
                type="button"
                onClick={() => setCategory('simpanan-pokok')}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                  category === 'simpanan-pokok'
                    ? 'border-[#004287] bg-[#e7eefe] text-[#004287] font-semibold'
                    : 'border-[#c2c6d3] text-[#424751]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Simpanan Pokok</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#424751] mb-1">
              Nominal Transaksi (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[#737782]">
                Rp
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-10 pl-10 pr-3 border border-[#c2c6d3] rounded-lg text-[15px] font-bold text-[#151c27] focus:outline-none focus:border-[#004287]"
                placeholder="2500000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Kanal Penerimaan
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
              >
                <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                <option value="Tunai Teller Pusat">Tunai Teller Pusat</option>
                <option value="QRIS KopKita Mobile">QRIS KopKita Mobile</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Keterangan
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan transaksi..."
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#c2c6d3]/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#424751] hover:bg-[#f0f3ff] rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1e5aa8] hover:bg-[#004287] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Simpan & Validasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface NewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Member) => void;
}

export const NewMemberModal: React.FC<NewMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
}) => {
  const [name, setName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'biasa' | 'luar-biasa' | 'pengurus'>('biasa');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase() || '')
      .join('');

    const newMember: Member = {
      id: `m-${Date.now()}`,
      name,
      memberNo: `AG-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone: phone || '0812-3456-7890',
      joinDate: '15 Sep 2025',
      status: 'Menunggu Verifikasi',
      category,
      skor: 'Baru',
      initials: initials || 'AG',
      avatarBg: 'bg-[#d6e3ff] text-[#004287]',
      nik: nik || '3201000000000000',
      simpananPokok: 500000,
      simpananWajib: 150000,
      simpananSukarela: 0,
      totalPinjamanAktif: 0,
      plafonMaksimal: 25000000,
    };

    onAddMember(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A]/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#737782] hover:text-[#151c27] p-1 rounded-lg hover:bg-[#f0f3ff]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 text-[#004287] mb-4">
          <span className="material-symbols-outlined text-[24px]">person_add</span>
          <h2 className="text-[18px] font-bold text-[#151c27]">
            Registrasi Anggota Baru
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[13px] font-medium text-[#424751] mb-1">
              Nama Lengkap Sesuai KTP *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Raden Mas Danang"
              className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                NIK (16 Digit) *
              </label>
              <input
                type="text"
                required
                maxLength={16}
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="3201xxxxxxxxxxxx"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                No. Handphone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anggota@email.com"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Kategori Keanggotaan
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
              >
                <option value="biasa">Anggota Biasa</option>
                <option value="luar-biasa">Anggota Luar Biasa</option>
                <option value="pengurus">Pengurus / Pengawas</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40 text-[12px] text-[#424751] space-y-1">
            <div className="flex justify-between font-medium">
              <span>Setoran Awal Simpanan Pokok:</span>
              <span className="text-[#004287] font-bold">Rp500.000</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Simpanan Wajib Bulan Pertama:</span>
              <span className="text-[#004287] font-bold">Rp150.000</span>
            </div>
            <p className="text-[11px] text-[#737782] pt-1">
              * Verifikasi berkas identitas dan buku tabungan akan diproses oleh tim surveyor dalam 1x24 jam.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-[#c2c6d3]/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#424751] hover:bg-[#f0f3ff] rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1e5aa8] hover:bg-[#004287] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Daftarkan Anggota</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-[#0F172A]/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative border border-[#c2c6d3]/60">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#737782] hover:text-[#151c27] p-1 rounded-lg hover:bg-[#f0f3ff]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Official Cooperative Receipt Layout */}
        <div className="border-b-2 border-dashed border-[#c2c6d3] pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="font-bold text-[18px] text-[#004287]">
              KOPKITA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
          </div>
          <p className="text-[12px] font-semibold text-[#151c27]">
            KSP SEJAHTERA UTAMA
          </p>
          <p className="text-[11px] text-[#737782]">
            Badan Hukum No: 518/BH/DISKOP/2012
          </p>
          <p className="text-[11px] text-[#737782]">
            Jl. Raya Sudirman No. 45, Jakarta Selatan
          </p>
        </div>

        <div className="py-4 space-y-2.5 text-[12px]">
          <div className="text-center bg-[#f0f3ff] py-1.5 rounded font-bold text-[#004287]">
            BUKTI TRANSAKSI RESMI KAS
          </div>

          <div className="flex justify-between text-[#424751]">
            <span>Nomor Ref:</span>
            <span className="font-mono font-semibold text-[#151c27]">
              {transaction.txNo}
            </span>
          </div>

          <div className="flex justify-between text-[#424751]">
            <span>Waktu:</span>
            <span className="font-medium text-[#151c27]">
              {transaction.timestamp}
            </span>
          </div>

          <div className="flex justify-between text-[#424751]">
            <span>Anggota:</span>
            <span className="font-semibold text-[#151c27]">
              {transaction.memberName}
            </span>
          </div>

          <div className="flex justify-between text-[#424751]">
            <span>No. Anggota:</span>
            <span className="font-mono text-[#151c27]">
              {transaction.memberNo}
            </span>
          </div>

          <div className="flex justify-between text-[#424751]">
            <span>Transaksi:</span>
            <span className="font-medium text-[#151c27]">
              {transaction.type}
            </span>
          </div>

          <div className="flex justify-between text-[#424751]">
            <span>Metode Bayar:</span>
            <span className="font-medium text-[#151c27]">
              {transaction.channel}
            </span>
          </div>

          <div className="pt-2 border-t border-[#c2c6d3]/40 flex justify-between items-center">
            <span className="text-[13px] font-bold text-[#151c27]">
              TOTAL DITERIMA:
            </span>
            <span className="text-[18px] font-bold text-[#006e2b]">
              {FORMAT_RUPIAH(transaction.amount)}
            </span>
          </div>

          <div className="flex justify-between text-[11px] text-[#737782] pt-1">
            <span>Status Validasi:</span>
            <span className="font-semibold text-[#006e2b]">
              BERHASIL & SAH
            </span>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-[#c2c6d3] flex items-center justify-between text-[11px] text-[#737782]">
          <div>
            <p>Petugas Kasir / Teller:</p>
            <p className="font-semibold text-[#151c27] mt-3">
              Bambang Sudarmono, S.E.
            </p>
          </div>
          <div className="w-14 h-14 border border-[#c2c6d3] rounded flex items-center justify-center bg-[#f0f3ff] text-[9px] text-center font-mono p-1">
            [QR VALID]
            <br />
            KOPKITA
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2 bg-[#004287] text-white text-[13px] font-semibold rounded-lg hover:bg-[#1e5aa8] transition-colors flex items-center justify-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Kuitansi</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#c2c6d3] text-[#424751] text-[13px] font-medium rounded-lg hover:bg-[#f0f3ff]"
            type="button"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    memberName: string;
    phone: string;
    amount: number;
    dueDate: string;
  } | null;
  onSend: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  data,
  onSend,
}) => {
  if (!isOpen || !data) return null;

  const messageTemplate = `Halo Bapak/Ibu ${data.memberName},\n\nSalam dari KSP Sejahtera Utama (KopKita).\nKami menginformasikan bahwa angsuran pinjaman Anda sebesar ${FORMAT_RUPIAH(data.amount)} akan jatuh tempo pada ${data.dueDate}.\n\nPembayaran dapat dilakukan via Transfer Bank BCA: 884-019-2819 a/n KopKita atau langsung melalui Teller Kantor Pusat.\n\nTerima kasih atas kerja samanya.`;

  return (
    <div className="fixed inset-0 bg-[#0F172A]/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#737782] hover:text-[#151c27] p-1 rounded-lg hover:bg-[#f0f3ff]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 text-[#006e2b] mb-4">
          <span className="material-symbols-outlined text-[24px]">chat</span>
          <h2 className="text-[17px] font-bold text-[#151c27]">
            Kirim Pengingat WhatsApp
          </h2>
        </div>

        <div className="space-y-3 text-left">
          <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40 text-[12px]">
            <p>
              <strong>Penerima:</strong> {data.memberName} ({data.phone})
            </p>
            <p>
              <strong>Nominal Tagihan:</strong> {FORMAT_RUPIAH(data.amount)}
            </p>
            <p>
              <strong>Jatuh Tempo:</strong> {data.dueDate}
            </p>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#424751] mb-1">
              Pratinjau Pesan WhatsApp Otomatis:
            </label>
            <textarea
              readOnly
              value={messageTemplate}
              rows={7}
              className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg text-[12px] text-[#151c27] font-mono leading-relaxed"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#c2c6d3]/40">
            <button
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-[#424751] hover:bg-[#f0f3ff] rounded-lg"
              type="button"
            >
              Batal
            </button>
            <button
              onClick={onSend}
              className="px-5 py-2 bg-[#006e2b] hover:bg-[#00531e] text-white rounded-lg text-[13px] font-semibold flex items-center gap-1.5 shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Kirim Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
