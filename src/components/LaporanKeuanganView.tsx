import React, { useState } from 'react';
import { Transaction, FORMAT_RUPIAH } from '../types';

interface LaporanKeuanganViewProps {
  transactions: Transaction[];
  onOpenReceipt: (tx: Transaction) => void;
  onNavigate: (view: any) => void;
}

export const LaporanKeuanganView: React.FC<LaporanKeuanganViewProps> = ({
  transactions,
  onOpenReceipt,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'kas' | 'simpanan' | 'pinjaman'>('kas');
  const [selectedMonth, setSelectedMonth] = useState('09-2025');

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#737782] mb-1">
            <button
              onClick={() => onNavigate('dashboard-operasional')}
              className="hover:text-[#004287] transition-colors"
            >
              Akuntansi &amp; Pembukuan
            </button>
            <span>/</span>
            <span className="text-[#151c27] font-semibold">
              Laporan Keuangan &amp; Mutasi Kas
            </span>
          </div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Laporan Keuangan &amp; Rekonsiliasi Kas
          </h1>
          <p className="text-[13px] text-[#424751]">
            Arus kas masuk-keluar (cashflow), perputaran likuiditas, dan rekonsiliasi buku besar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="h-10 px-3.5 bg-white hover:bg-[#f0f3ff] text-[#424751] font-semibold text-[13px] rounded-lg border border-[#c2c6d3] transition-colors flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak PDF</span>
          </button>
          <button
            onClick={() => {
              alert('Laporan Kas Periode September 2025 berhasil diekspor dalam format XLSX.');
            }}
            className="h-10 px-4 bg-[#004287] hover:bg-[#1e5aa8] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>Export ke Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#c2c6d3]/40 flex gap-6 text-[14px]">
        <button
          onClick={() => setActiveTab('kas')}
          className={`pb-3 font-semibold transition-colors relative ${
            activeTab === 'kas'
              ? 'text-[#004287]'
              : 'text-[#424751] hover:text-[#151c27]'
          }`}
        >
          Laporan Kas &amp; Rekonsiliasi
          {activeTab === 'kas' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004287]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('simpanan')}
          className={`pb-3 font-semibold transition-colors relative ${
            activeTab === 'simpanan'
              ? 'text-[#004287]'
              : 'text-[#424751] hover:text-[#151c27]'
          }`}
        >
          Laporan Simpanan Anggota
          {activeTab === 'simpanan' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004287]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('pinjaman')}
          className={`pb-3 font-semibold transition-colors relative ${
            activeTab === 'pinjaman'
              ? 'text-[#004287]'
              : 'text-[#424751] hover:text-[#151c27]'
          }`}
        >
          Laporan Portofolio Pinjaman
          {activeTab === 'pinjaman' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004287]" />
          )}
        </button>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Arus Masuk */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Arus Masuk (Inflow)
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#86fb97]/40 text-[#002108] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">south_west</span>
            </div>
          </div>
          <div className="text-[22px] font-bold text-[#006e2b] tracking-tight">
            Rp412.850.000
          </div>
          <div className="text-[11px] text-[#737782] mt-1 flex items-center gap-1">
            <span className="text-[#006e2b] font-semibold">+14.2%</span> vs bulan lalu
          </div>
        </div>

        {/* Total Arus Keluar */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Arus Keluar (Outflow)
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">north_east</span>
            </div>
          </div>
          <div className="text-[22px] font-bold text-[#ba1a1a] tracking-tight">
            Rp285.400.000
          </div>
          <div className="text-[11px] text-[#737782] mt-1 flex items-center gap-1">
            <span className="text-[#006e2b] font-semibold">-4.1%</span> efisiensi beban
          </div>
        </div>

        {/* Surplus Bersih Kas */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Surplus Bersih Kas
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#d6e3ff] text-[#004287] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">savings</span>
            </div>
          </div>
          <div className="text-[22px] font-bold text-[#004287] tracking-tight">
            +Rp127.450.000
          </div>
          <div className="text-[11px] text-[#006e2b] font-semibold mt-1">
            Rasio Operasional Sangat Baik
          </div>
        </div>

        {/* Saldo Akhir Kas & Bank */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Saldo Akhir Kas &amp; Bank
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#e7eefe] text-[#1e5aa8] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
          </div>
          <div className="text-[22px] font-bold text-[#151c27] tracking-tight">
            Rp1.032.400.000
          </div>
          <div className="text-[11px] text-[#006e2b] font-semibold mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Rekonsiliasi Bank Sesuai
          </div>
        </div>
      </div>

      {/* Cash Trend Graph */}
      <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-[16px] text-[#151c27]">
              Grafik Fluktuasi Kas &amp; Likuiditas Harian (September 2025)
            </h3>
            <p className="text-[12px] text-[#424751]">
              Titik saldo kas berjalan setelah pencatatan transaksi kasir teller dan kliring bank
            </p>
          </div>
          <div className="flex items-center gap-3 text-[12px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#004287]"></span>
              <span className="text-[#424751]">Saldo Kas Berjalan</span>
            </div>
          </div>
        </div>

        {/* Area Line Chart SVG */}
        <div className="w-full h-56 relative pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#004287" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#004287" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="#c2c6d3" strokeDasharray="3 3" opacity="0.4" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#c2c6d3" strokeDasharray="3 3" opacity="0.4" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#c2c6d3" strokeDasharray="3 3" opacity="0.4" />
            <line x1="0" y1="190" x2="800" y2="190" stroke="#c2c6d3" strokeDasharray="3 3" opacity="0.4" />

            {/* Area Path */}
            <path
              d="M 0 160 Q 100 140, 200 130 T 400 110 T 600 80 T 800 50 L 800 200 L 0 200 Z"
              fill="url(#cashGrad)"
            />

            {/* Stroke Line Path */}
            <path
              d="M 0 160 Q 100 140, 200 130 T 400 110 T 600 80 T 800 50"
              fill="none"
              stroke="#004287"
              strokeWidth="3"
            />

            {/* Point circles */}
            <circle cx="200" cy="130" r="4" fill="#004287" />
            <circle cx="400" cy="110" r="4" fill="#004287" />
            <circle cx="600" cy="80" r="4" fill="#004287" />
            <circle cx="800" cy="50" r="5" fill="#006e2b" stroke="#ffffff" strokeWidth="2" />
          </svg>

          <div className="flex justify-between text-[11px] text-[#737782] pt-2">
            <span>01 Sep (Rp905 Jt)</span>
            <span>05 Sep</span>
            <span>10 Sep</span>
            <span>15 Sep (Rp1.032 Jt)</span>
          </div>
        </div>
      </div>

      {/* Rincian Jurnal Kas Berjalan */}
      <div className="bg-white rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="p-5 border-b border-[#c2c6d3]/40 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[16px] text-[#151c27]">
              Buku Jurnal Mutasi Kas Harian
            </h3>
            <p className="text-[12px] text-[#424751]">
              Rekaman arus kas masuk (debet) dan keluar (kredit) periode 15 September 2025
            </p>
          </div>
          <span className="text-[12px] font-mono px-2.5 py-1 rounded bg-[#f0f3ff] text-[#004287] font-semibold">
            Status: Seimbang (Balance)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                <th className="py-3 px-4">NO. JURNAL &amp; WAKTU</th>
                <th className="py-3 px-4">KETERANGAN TRANSAKSI</th>
                <th className="py-3 px-4">AKUN KAS / BANK</th>
                <th className="py-3 px-4 text-right">PENERIMAAN (DEBET)</th>
                <th className="py-3 px-4 text-right">PENGELUARAN (KREDIT)</th>
                <th className="py-3 px-4 text-right">SALDO AKHIR</th>
                <th className="py-3 px-4 text-center">BUKTI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d3]/30">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#f9f9ff]">
                  <td className="py-3 px-4">
                    <div className="font-mono text-[12px] text-[#151c27]">
                      {tx.txNo}
                    </div>
                    <span className="text-[11px] text-[#737782]">{tx.time}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-[#151c27]">{tx.type}</div>
                    <div className="text-[11px] text-[#737782]">
                      {tx.memberName} ({tx.memberNo})
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#424751] text-[12px]">
                    {tx.channel}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-[#006e2b]">
                    {!tx.isNegative ? FORMAT_RUPIAH(tx.amount) : '-'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-[#ba1a1a]">
                    {tx.isNegative ? FORMAT_RUPIAH(tx.amount) : '-'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#151c27]">
                    {FORMAT_RUPIAH(tx.runningBalance || 1032400000)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenReceipt(tx)}
                      className="p-1 text-[#004287] hover:bg-[#e7eefe] rounded"
                      title="Lihat Kuitansi"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        receipt_long
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Callout */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#006e2b] text-[24px]">
            verified_user
          </span>
          <div>
            <div className="font-bold text-[#151c27]">
              Buku Besar Telah Divalidasi oleh Tim Pengawas KSP
            </div>
            <div className="text-[12px] text-[#424751]">
              Tidak ditemukan selisih kas fisik teller vs saldo buku kas digital (Selisih: Rp0).
            </div>
          </div>
        </div>
        <button
          onClick={() => alert('Mengunduh Berita Acara Rekonsiliasi Kas PDF...')}
          className="px-3.5 py-1.5 bg-[#006e2b] text-white text-[12px] font-semibold rounded-lg hover:bg-[#00531e] transition-colors self-start sm:self-auto shrink-0"
        >
          Unduh Berita Acara
        </button>
      </div>
    </div>
  );
};
