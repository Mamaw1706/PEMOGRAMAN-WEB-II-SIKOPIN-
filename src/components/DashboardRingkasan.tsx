import React from 'react';
import { DueInstallment, FORMAT_RUPIAH, Member } from '../types';

interface DashboardRingkasanProps {
  dueInstallments: DueInstallment[];
  onOpenWhatsApp: (item: DueInstallment) => void;
  onNavigate: (view: any) => void;
  onViewMember?: (member: Member) => void;
}

export const DashboardRingkasan: React.FC<DashboardRingkasanProps> = ({
  dueInstallments,
  onOpenWhatsApp,
  onNavigate,
}) => {
  return (
    <div className="space-y-6">
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Anggota Aktif */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Anggota Aktif
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#d6e3ff] flex items-center justify-center text-[#004287]">
              <span className="material-symbols-outlined text-[20px]">group</span>
            </div>
          </div>
          <div className="text-[24px] font-bold text-[#151c27] tracking-tight">
            1.428
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px]">
            <span className="text-[#006e2b] font-semibold flex items-center">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              +12
            </span>
            <span className="text-[#737782]">anggota baru bulan ini</span>
          </div>
        </div>

        {/* Card 2: Simpanan Terkumpul */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Simpanan Terkumpul
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#86fb97]/40 flex items-center justify-center text-[#006e2b]">
              <span className="material-symbols-outlined text-[20px]">
                account_balance_wallet
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Rp4.825.450.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px]">
            <span className="text-[#006e2b] font-semibold flex items-center">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              +8.4%
            </span>
            <span className="text-[#737782]">vs bulan lalu</span>
          </div>
        </div>

        {/* Card 3: Pinjaman Berjalan */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Pinjaman Berjalan
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#e7eefe] flex items-center justify-center text-[#1e5aa8]">
              <span className="material-symbols-outlined text-[20px]">
                credit_score
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Rp3.150.800.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px]">
            <span className="text-[#004287] font-semibold flex items-center">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              +3.2%
            </span>
            <span className="text-[#737782]">vs bulan lalu</span>
          </div>
        </div>

        {/* Card 4: Pinjaman Menunggak */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Pinjaman Menunggak
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">
                error_outline
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#ba1a1a] tracking-tight">
            Rp84.200.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px]">
            <span className="text-[#ba1a1a] font-semibold">12 Kasus</span>
            <span className="text-[#737782]">perlu ditindaklanjuti</span>
          </div>
        </div>
      </div>

      {/* Grid: 6 Bulan Chart vs Aktivitas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 6 Bulan Simpanan vs Pinjaman */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-[16px] text-[#151c27]">
                  6 Bulan Terakhir: Simpanan vs Pinjaman
                </h3>
                <p className="text-[12px] text-[#424751]">
                  Keseimbangan likuiditas simpanan terhadap penyaluran kredit (Apr - Sep 2025)
                </p>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#004287]"></span>
                  <span className="text-[#424751]">Simpanan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#006e2b]"></span>
                  <span className="text-[#424751]">Pinjaman</span>
                </div>
              </div>
            </div>

            {/* High visual multi-point chart visualization */}
            <div className="w-full h-64 relative flex items-end pt-4 pb-2 px-2 border-b border-[#c2c6d3]/40">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-[#737782] w-full"></div>
                <div className="border-b border-dashed border-[#737782] w-full"></div>
                <div className="border-b border-dashed border-[#737782] w-full"></div>
                <div className="border-b border-dashed border-[#737782] w-full"></div>
              </div>

              <div className="w-full flex justify-between items-end z-10 h-full px-4">
                {[
                  { month: 'Apr 25', s: 60, p: 48 },
                  { month: 'Mei 25', s: 68, p: 52 },
                  { month: 'Jun 25', s: 76, p: 58 },
                  { month: 'Jul 25', s: 82, p: 62 },
                  { month: 'Agu 25', s: 89, p: 66 },
                  { month: 'Sep 25', s: 95, p: 70, active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 justify-end h-full">
                    <div className="flex items-end gap-1.5 h-44">
                      <div
                        className={`w-7 sm:w-8 bg-[#004287] rounded-t-sm transition-all hover:opacity-90 ${
                          item.active ? 'ring-2 ring-[#004287]/40' : ''
                        }`}
                        style={{ height: `${item.s}%` }}
                        title={`Simpanan: ${item.s * 50} Juta`}
                      />
                      <div
                        className={`w-7 sm:w-8 bg-[#006e2b] rounded-t-sm transition-all hover:opacity-90 ${
                          item.active ? 'ring-2 ring-[#006e2b]/40' : ''
                        }`}
                        style={{ height: `${item.p}%` }}
                        title={`Pinjaman: ${item.p * 45} Juta`}
                      />
                    </div>
                    <span
                      className={`text-[11px] mt-2 font-medium ${
                        item.active ? 'font-bold text-[#004287]' : 'text-[#424751]'
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#c2c6d3]/30 flex flex-wrap items-center justify-between text-[12px] text-[#424751] gap-2">
            <div>
              <span className="font-semibold text-[#151c27]">Tingkat Likuiditas Saat Ini:</span>{' '}
              <span className="text-[#006e2b] font-bold text-[13px]">65.3%</span>{' '}
              <span className="text-[#737782]">(Batas Ideal Permenkop: 60% - 75%)</span>
            </div>
            <button
              onClick={() => onNavigate('laporan-keuangan')}
              className="text-[#004287] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Analisis Laporan Lengkap</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Aktivitas Terbaru */}
        <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[16px] text-[#151c27]">
                  Aktivitas Terbaru
                </h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006e2b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006e2b]"></span>
                </span>
              </div>
              <span className="text-[11px] text-[#737782]">Real-time Feed</span>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#86fb97]/40 text-[#002108] flex items-center justify-center font-bold text-[11px] shrink-0">
                  BS
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-[#151c27] font-semibold">
                    Budi Santoso menyetor Simpanan Sukarela
                  </p>
                  <p className="text-[11px] text-[#006e2b] font-bold font-mono">
                    +Rp5.000.000 (QRIS KopKita)
                  </p>
                  <span className="text-[10px] text-[#737782]">10 menit yang lalu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#86fb97]/40 text-[#002108] flex items-center justify-center font-bold text-[11px] shrink-0">
                  SR
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-[#151c27] font-semibold">
                    Siti Rahayu membayar Simpanan Wajib
                  </p>
                  <p className="text-[11px] text-[#006e2b] font-bold font-mono">
                    +Rp150.000 (Teller Tunai)
                  </p>
                  <span className="text-[10px] text-[#737782]">25 menit yang lalu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d6e3ff] text-[#004287] flex items-center justify-center font-bold text-[11px] shrink-0">
                  LF
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-[#151c27] font-semibold">
                    Luqmanul Fikri membayar Angsuran Ke-4
                  </p>
                  <p className="text-[11px] text-[#004287] font-bold font-mono">
                    +Rp2.500.000 (Transfer BCA)
                  </p>
                  <span className="text-[10px] text-[#737782]">1 jam yang lalu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-bold text-[11px] shrink-0">
                  AW
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-[#151c27] font-semibold">
                    Auto-Debit Gagal: Andi Wijaya
                  </p>
                  <p className="text-[11px] text-[#ba1a1a] font-bold font-mono">
                    Rp3.200.000 (Saldo Tidak Cukup)
                  </p>
                  <span className="text-[10px] text-[#737782]">2 jam yang lalu</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d6e3ff] text-[#004287] flex items-center justify-center font-bold text-[11px] shrink-0">
                  DL
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-[#151c27] font-semibold">
                    Pencairan Pinjaman Modal Dewi Lestari
                  </p>
                  <p className="text-[11px] text-[#ba1a1a] font-bold font-mono">
                    -Rp20.000.000 (Bank BRI)
                  </p>
                  <span className="text-[10px] text-[#737782]">3 jam yang lalu</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#c2c6d3]/30 text-center">
            <button
              onClick={() => onNavigate('dashboard-operasional')}
              className="text-[12px] text-[#004287] font-semibold hover:underline"
            >
              Lihat Semua Log Transaksi
            </button>
          </div>
        </div>
      </div>

      {/* 5 Anggota dengan Angsuran Jatuh Tempo Minggu Ini Table */}
      <div className="bg-white rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="p-5 border-b border-[#c2c6d3]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-[16px] text-[#151c27]">
              5 Anggota dengan Angsuran Jatuh Tempo Minggu Ini
            </h3>
            <p className="text-[12px] text-[#424751]">
              Kirimkan pengingat ramah melalui WhatsApp atau terbitkan tagihan sistem
            </p>
          </div>
          <span className="text-[12px] font-semibold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 self-start sm:self-auto">
            Prioritas Penagihan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                <th className="py-3 px-4">ANGGOTA</th>
                <th className="py-3 px-4">JENIS PINJAMAN</th>
                <th className="py-3 px-4">NOMINAL ANGSURAN</th>
                <th className="py-3 px-4">JATUH TEMPO</th>
                <th className="py-3 px-4 text-right">AKSI TINDAK LANJUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d3]/30">
              {dueInstallments.map((due) => (
                <tr key={due.id} className="hover:bg-[#f9f9ff] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${due.avatarBg}`}
                      >
                        {due.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-[#151c27]">
                          {due.memberName}
                        </div>
                        <div className="text-[11px] text-[#737782]">
                          {due.memberNo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#424751] font-medium">
                    {due.loanType}
                  </td>
                  <td className="py-3.5 px-4 font-bold font-mono text-[#004287]">
                    {FORMAT_RUPIAH(due.amount)}
                  </td>
                  <td className="py-3.5 px-4">
                    {due.isUrgent ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[11px]">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        {due.dueDate}
                      </span>
                    ) : (
                      <span className="text-[#424751] text-[12px]">
                        {due.dueDate}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenWhatsApp(due)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#006e2b] bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-300 transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          chat
                        </span>
                        <span>Ingatkan WA</span>
                      </button>
                      <button
                        onClick={() => onNavigate('data-anggota')}
                        className="p-1 text-[#737782] hover:text-[#151c27] hover:bg-[#e7eefe] rounded"
                        title="Lihat Detail Profil Anggota"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
