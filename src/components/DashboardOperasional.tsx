import React, { useState } from 'react';
import { Member, Transaction, LoanApplication, FORMAT_RUPIAH } from '../types';

interface DashboardOperasionalProps {
  transactions: Transaction[];
  loanApplications: LoanApplication[];
  onOpenReceipt: (tx: Transaction) => void;
  onOpenNewTransaction: () => void;
  onNavigate: (view: any) => void;
  onReviewLoan: (app: LoanApplication) => void;
}

export const DashboardOperasional: React.FC<DashboardOperasionalProps> = ({
  transactions,
  loanApplications,
  onOpenReceipt,
  onOpenNewTransaction,
  onNavigate,
  onReviewLoan,
}) => {
  const [filterType, setFilterType] = useState<string>('semua');
  const [searchTable, setSearchTable] = useState<string>('');

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'angsuran' && tx.category !== 'angsuran') return false;
    if (filterType === 'simpanan' && !tx.category.startsWith('simpanan')) return false;
    if (filterType === 'menunggak' && tx.status !== 'Menunggak') return false;
    if (searchTable) {
      const q = searchTable.toLowerCase();
      return (
        tx.memberName.toLowerCase().includes(q) ||
        tx.memberNo.toLowerCase().includes(q) ||
        tx.txNo.toLowerCase().includes(q) ||
        tx.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Simpanan */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Simpanan Anggota
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#d6e3ff] flex items-center justify-center text-[#004287]">
              <span className="material-symbols-outlined text-[20px]">
                account_balance_wallet
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Rp4.825.450.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px] font-medium">
            <span className="text-[#006e2b] flex items-center">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +12.4%
            </span>
            <span className="text-[#737782]">vs bulan lalu</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#004287]/5 rounded-full -mr-6 -mt-6 pointer-events-none" />
        </div>

        {/* Card 2: Portofolio Pinjaman */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Portofolio Pinjaman Aktif
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#86fb97]/40 flex items-center justify-center text-[#006e2b]">
              <span className="material-symbols-outlined text-[20px]">
                payments
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Rp3.150.800.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px] font-medium">
            <span className="text-[#006e2b] flex items-center">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +5.8%
            </span>
            <span className="text-[#737782]">vs bulan lalu</span>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#006e2b]/5 rounded-full -mr-6 -mt-6 pointer-events-none" />
        </div>

        {/* Card 3: Jatuh Tempo Hari Ini */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Angsuran Jatuh Tempo Hari Ini
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[20px]">
                schedule
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Rp48.650.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px] font-medium">
            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[11px]">
              18 Anggota
            </span>
            <span className="text-[#737782]">perlu ditagih</span>
          </div>
        </div>

        {/* Card 4: Kredit Menunggak (NPL) */}
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-medium text-[#424751]">
              Kredit Menunggak (NPL)
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">
                warning
              </span>
            </div>
          </div>
          <div className="text-[22px] sm:text-[24px] font-bold text-[#ba1a1a] tracking-tight">
            Rp84.200.000
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[12px] font-medium">
            <span className="text-[#ba1a1a] font-semibold">2.67%</span>
            <span className="text-[#737782]">Rasio NPL (Sehat &lt; 5%)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Cashflow Chart & Loan Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cashflow & Turnover Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-[16px] text-[#151c27]">
                  Arus Kas &amp; Perputaran Simpan Pinjam 2025
                </h3>
                <p className="text-[12px] text-[#424751]">
                  Realisasi penerimaan simpanan vs penyaluran pinjaman
                </p>
              </div>
              <div className="flex items-center gap-4 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#004287]"></span>
                  <span className="text-[#424751]">Simpanan Masuk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#006e2b]"></span>
                  <span className="text-[#424751]">Pinjaman Dicairkan</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Chart */}
            <div className="w-full h-64 relative flex items-end pt-4 pb-2 px-2 border-b border-[#c2c6d3]/40">
              {/* Background grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30">
                <div className="border-b border-dashed border-[#737782] w-full"></div>
                <div className="border-b border-dashed border-[#737782] w-full"></div>
                <div className="border-b border-dashed border-[#737782] w-full"></div>
                <div className="border-b border-dashed border-[#737782] w-full"></div>
              </div>

              {/* Bars per month */}
              <div className="w-full flex justify-around items-end z-10 h-full">
                {/* Mei */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      className="w-8 sm:w-10 bg-[#004287] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '70%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp350 jt
                      </div>
                    </div>
                    <div
                      className="w-8 sm:w-10 bg-[#006e2b] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '55%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp275 jt
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#424751] mt-2">
                    Mei 25
                  </span>
                </div>

                {/* Jun */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      className="w-8 sm:w-10 bg-[#004287] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '78%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp390 jt
                      </div>
                    </div>
                    <div
                      className="w-8 sm:w-10 bg-[#006e2b] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '62%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp310 jt
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#424751] mt-2">
                    Jun 25
                  </span>
                </div>

                {/* Jul */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      className="w-8 sm:w-10 bg-[#004287] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '85%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp425 jt
                      </div>
                    </div>
                    <div
                      className="w-8 sm:w-10 bg-[#006e2b] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '68%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp340 jt
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#424751] mt-2">
                    Jul 25
                  </span>
                </div>

                {/* Agu */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      className="w-8 sm:w-10 bg-[#004287] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '82%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp410 jt
                      </div>
                    </div>
                    <div
                      className="w-8 sm:w-10 bg-[#006e2b] rounded-t-sm hover:opacity-90 transition-all cursor-pointer group relative"
                      style={{ height: '74%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp370 jt
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#424751] mt-2">
                    Agu 25
                  </span>
                </div>

                {/* Sep (Berjalan) */}
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      className="w-8 sm:w-10 bg-[#004287] rounded-t-sm shadow-md hover:opacity-90 transition-all cursor-pointer group relative ring-2 ring-[#004287]/20"
                      style={{ height: '92%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                        Rp460 jt
                      </div>
                    </div>
                    <div
                      className="w-8 sm:w-10 bg-[#006e2b] rounded-t-sm shadow-md hover:opacity-90 transition-all cursor-pointer group relative ring-2 ring-[#006e2b]/20"
                      style={{ height: '60%' }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#151c27] text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Rp300 jt
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#004287] mt-2 flex items-center gap-1">
                    Sep 25 <span className="w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Liquidity Strip */}
          <div className="mt-4 pt-3 border-t border-[#c2c6d3]/30 grid grid-cols-3 gap-2 text-[12px]">
            <div className="p-2.5 rounded-lg bg-[#f0f3ff] border border-[#c2c6d3]/40">
              <span className="text-[11px] text-[#737782] block">Kas Bank BCA</span>
              <span className="font-bold text-[#151c27]">Rp640.250.000</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f0f3ff] border border-[#c2c6d3]/40">
              <span className="text-[11px] text-[#737782] block">Kas Mandiri</span>
              <span className="font-bold text-[#151c27]">Rp312.150.000</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#f0f3ff] border border-[#c2c6d3]/40">
              <span className="text-[11px] text-[#737782] block">Kas Tunai Fisik</span>
              <span className="font-bold text-[#151c27]">Rp80.000.000</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Antrean Pengajuan Pinjaman */}
        <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[16px] text-[#151c27]">
                  Antrean Pengajuan
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                  {loanApplications.length} Baru
                </span>
              </div>
              <button
                onClick={() => onNavigate('pengajuan-pinjaman')}
                className="text-[12px] text-[#004287] font-semibold hover:underline"
              >
                + Ajukan Baru
              </button>
            </div>

            <div className="divide-y divide-[#c2c6d3]/30">
              {loanApplications.map((app) => (
                <div key={app.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] ${app.avatarBg}`}
                      >
                        {app.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[13px] text-[#151c27]">
                            {app.memberName}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#e7eefe] text-[#004287] font-bold">
                            {app.score}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#737782]">
                          {app.memberNo} • Tenor {app.tenor}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[13px] text-[#151c27]">
                        {FORMAT_RUPIAH(app.amount)}
                      </div>
                      <span className="text-[10px] text-[#737782]">
                        {app.loanType}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${app.statusColor}`}
                      ></span>
                      <span className="text-[11px] text-[#424751] font-medium truncate max-w-[150px]">
                        {app.status}
                      </span>
                    </div>
                    <button
                      onClick={() => onReviewLoan(app)}
                      className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors ${
                        app.actionPrimary
                          ? 'bg-[#004287] text-white hover:bg-[#1e5aa8]'
                          : 'bg-[#f0f3ff] text-[#004287] hover:bg-[#e7eefe] border border-[#c2c6d3]'
                      }`}
                      type="button"
                    >
                      {app.actionLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#c2c6d3]/30 text-center">
            <button
              onClick={() => onNavigate('pengajuan-pinjaman')}
              className="text-[12px] text-[#004287] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <span>Buka Formulir Analisis Kredit Pinjaman</span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Monitoring Transaksi Simpanan & Angsuran Terkini Table */}
      <div className="bg-white rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-[#c2c6d3]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-[16px] text-[#151c27]">
              Monitoring Transaksi Simpanan &amp; Angsuran Terkini
            </h3>
            <p className="text-[12px] text-[#424751]">
              Log mutasi perputaran dana harian yang telah tervalidasi buku besar
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pill Buttons */}
            <div className="inline-flex rounded-lg p-1 bg-[#f0f3ff] border border-[#c2c6d3]/50 text-[12px]">
              <button
                onClick={() => setFilterType('semua')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  filterType === 'semua'
                    ? 'bg-white text-[#004287] shadow-xs font-semibold'
                    : 'text-[#424751] hover:text-[#151c27]'
                }`}
                type="button"
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType('angsuran')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  filterType === 'angsuran'
                    ? 'bg-white text-[#004287] shadow-xs font-semibold'
                    : 'text-[#424751] hover:text-[#151c27]'
                }`}
                type="button"
              >
                Angsuran
              </button>
              <button
                onClick={() => setFilterType('simpanan')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  filterType === 'simpanan'
                    ? 'bg-white text-[#004287] shadow-xs font-semibold'
                    : 'text-[#424751] hover:text-[#151c27]'
                }`}
                type="button"
              >
                Setoran Simpanan
              </button>
              <button
                onClick={() => setFilterType('menunggak')}
                className={`px-3 py-1 rounded-md transition-colors font-medium ${
                  filterType === 'menunggak'
                    ? 'bg-white text-[#ba1a1a] shadow-xs font-semibold'
                    : 'text-[#ba1a1a] hover:text-[#93000a]'
                }`}
                type="button"
              >
                Menunggak
              </button>
            </div>

            {/* Quick Table Search */}
            <div className="relative">
              <input
                type="text"
                value={searchTable}
                onChange={(e) => setSearchTable(e.target.value)}
                placeholder="Saring transaksi..."
                className="h-8 pl-7 pr-2.5 text-[12px] bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[#151c27] focus:outline-none focus:bg-white focus:border-[#004287]"
              />
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#737782] text-[16px]">
                search
              </span>
            </div>

            <button
              onClick={onOpenNewTransaction}
              className="h-8 px-3 bg-[#1e5aa8] text-white text-[12px] font-semibold rounded-lg hover:bg-[#004287] transition-colors flex items-center gap-1 shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Entri Kas</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                <th className="py-3 px-4">WAKTU &amp; ID TRANSAKSI</th>
                <th className="py-3 px-4">ANGGOTA KOPERASI</th>
                <th className="py-3 px-4">JENIS TRANSAKSI</th>
                <th className="py-3 px-4">NOMINAL</th>
                <th className="py-3 px-4">KANAL PEMBAYARAN</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d3]/30">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-[#f9f9ff] transition-colors group"
                >
                  {/* Waktu & ID */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#151c27]">{tx.time}</div>
                    <span className="text-[11px] font-mono text-[#737782]">
                      {tx.txNo}
                    </span>
                  </td>

                  {/* Anggota */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${tx.memberAvatarBg}`}
                      >
                        {tx.memberInitials}
                      </div>
                      <div>
                        <div className="font-medium text-[#151c27]">
                          {tx.memberName}
                        </div>
                        <div className="text-[11px] text-[#737782]">
                          {tx.memberNo}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Jenis Transaksi */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#151c27]">{tx.type}</span>
                  </td>

                  {/* Nominal */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold font-mono ${
                        tx.isNegative
                          ? 'text-[#ba1a1a]'
                          : tx.category === 'angsuran'
                          ? 'text-[#004287]'
                          : 'text-[#006e2b]'
                      }`}
                    >
                      {tx.isNegative ? '-' : '+'}
                      {FORMAT_RUPIAH(tx.amount)}
                    </span>
                  </td>

                  {/* Kanal Pembayaran */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-[#424751] text-[12px]">
                      <span className="material-symbols-outlined text-[16px] text-[#737782]">
                        {tx.channelIcon}
                      </span>
                      <span>{tx.channel}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {tx.status === 'Lancar' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#86fb97]/40 text-[#002108] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
                        Lancar
                      </span>
                    )}
                    {tx.status === 'Lunas' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#86fb97]/40 text-[#002108] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
                        Lunas
                      </span>
                    )}
                    {tx.status === 'Menunggak' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                        Menunggak ({tx.overdueDays} Hr)
                      </span>
                    )}
                    {tx.status === 'Disetujui' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d6e3ff] text-[#004287] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#004287]"></span>
                        Cair
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenReceipt(tx)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#004287] bg-[#f0f3ff] hover:bg-[#e7eefe] rounded border border-[#c2c6d3] transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        receipt_long
                      </span>
                      <span>Kuitansi</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 border-t border-[#c2c6d3]/40 bg-[#f0f3ff]/50 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#424751] gap-2">
          <span>Menampilkan 1-6 dari 124 transaksi hari ini</span>
          <div className="flex items-center gap-1">
            <button
              className="px-2.5 py-1 border border-[#c2c6d3] rounded bg-white text-[#737782] disabled:opacity-50"
              disabled
            >
              Sebelumnya
            </button>
            <button className="px-2.5 py-1 border border-[#004287] bg-[#004287] text-white rounded font-bold">
              1
            </button>
            <button className="px-2.5 py-1 border border-[#c2c6d3] rounded bg-white text-[#151c27] hover:bg-[#e7eefe]">
              2
            </button>
            <button className="px-2.5 py-1 border border-[#c2c6d3] rounded bg-white text-[#151c27] hover:bg-[#e7eefe]">
              3
            </button>
            <button className="px-2.5 py-1 border border-[#c2c6d3] rounded bg-white text-[#151c27] hover:bg-[#e7eefe]">
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
