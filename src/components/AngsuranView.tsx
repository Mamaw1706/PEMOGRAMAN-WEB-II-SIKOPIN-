import React, { useState } from 'react';
import { DueInstallment, Transaction, FORMAT_RUPIAH } from '../types';

interface AngsuranViewProps {
  isHistory?: boolean;
  dueInstallments: DueInstallment[];
  transactions: Transaction[];
  onOpenReceipt: (tx: Transaction) => void;
  onOpenWhatsApp: (item: DueInstallment) => void;
  onOpenNewTransaction: () => void;
  onNavigate: (view: any) => void;
}

export const AngsuranView: React.FC<AngsuranViewProps> = ({
  isHistory = false,
  dueInstallments,
  transactions,
  onOpenReceipt,
  onOpenWhatsApp,
  onOpenNewTransaction,
  onNavigate,
}) => {
  const angsuranTransactions = transactions.filter((t) => t.category === 'angsuran');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#737782] mb-1">
            <button
              onClick={() => onNavigate('dashboard-operasional')}
              className="hover:text-[#004287]"
            >
              Pinjaman
            </button>
            <span>/</span>
            <span className="text-[#151c27] font-semibold">
              {isHistory ? 'Riwayat Pinjaman & Pelunasan' : 'Jadwal Angsuran & Penagihan'}
            </span>
          </div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#151c27]">
            {isHistory ? 'Riwayat Pinjaman & Pelunasan' : 'Monitoring Angsuran Berjalan'}
          </h1>
          <p className="text-[13px] text-[#424751]">
            {isHistory
              ? 'Arsip riwayat pinjaman lunas, pencairan dana, dan rekonsiliasi bunga masa lalu.'
              : 'Daftar penagihan angsuran bulanan, pantauan jatuh tempo, dan tindakan pengingat.'}
          </p>
        </div>

        <button
          onClick={onOpenNewTransaction}
          className="h-10 px-4 bg-[#1e5aa8] hover:bg-[#004287] text-white font-semibold text-[13px] rounded-lg shadow-sm flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">payments</span>
          <span>Catat Bayar Angsuran</span>
        </button>
      </div>

      {!isHistory ? (
        <>
          {/* Due table */}
          <div className="bg-white rounded-xl border border-[#c2c6d3]/60 overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
            <div className="p-4 border-b border-[#c2c6d3]/40 flex items-center justify-between">
              <h3 className="font-bold text-[15px] text-[#151c27]">
                Jadwal Tagihan Angsuran Jatuh Tempo Terdekat
              </h3>
              <span className="text-[12px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                {dueInstallments.length} Perlu Konfirmasi
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                    <th className="py-3 px-4">ANGGOTA PEMINJAM</th>
                    <th className="py-3 px-4">PRODUK PINJAMAN</th>
                    <th className="py-3 px-4">ANGSURAN KE-</th>
                    <th className="py-3 px-4">NOMINAL ANGSURAN</th>
                    <th className="py-3 px-4">JATUH TEMPO</th>
                    <th className="py-3 px-4 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c6d3]/30">
                  {dueInstallments.map((due) => (
                    <tr key={due.id} className="hover:bg-[#f9f9ff]">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#151c27]">
                          {due.memberName}
                        </div>
                        <div className="text-[11px] font-mono text-[#737782]">
                          {due.memberNo}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#424751]">
                        {due.loanType}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#004287]">
                        {due.installmentPeriod}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#004287]">
                        {FORMAT_RUPIAH(due.amount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            due.isUrgent
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-[#424751]'
                          }`}
                        >
                          {due.dueDate}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onOpenWhatsApp(due)}
                          className="px-2.5 py-1 text-[11px] bg-emerald-50 text-[#006e2b] border border-emerald-300 rounded font-semibold hover:bg-emerald-100 inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            chat
                          </span>
                          <span>Kirim WA</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* History table */
        <div className="bg-white rounded-xl border border-[#c2c6d3]/60 overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="p-4 border-b border-[#c2c6d3]/40 flex items-center justify-between">
            <h3 className="font-bold text-[15px] text-[#151c27]">
              Log Pembayaran Angsuran Terbaru
            </h3>
            <span className="text-[12px] text-[#737782]">
              Telah dibukukan ke penerimaan kas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                  <th className="py-3 px-4">NO. KUITANSI &amp; WAKTU</th>
                  <th className="py-3 px-4">NAMA ANGGOTA</th>
                  <th className="py-3 px-4">JENIS ANGSURAN</th>
                  <th className="py-3 px-4">METODE BAYAR</th>
                  <th className="py-3 px-4 text-right">NOMINAL DITERIMA</th>
                  <th className="py-3 px-4 text-center">KUITANSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c2c6d3]/30">
                {angsuranTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#f9f9ff]">
                    <td className="py-3 px-4">
                      <div className="font-mono text-[12px] font-semibold text-[#151c27]">
                        {tx.txNo}
                      </div>
                      <span className="text-[11px] text-[#737782]">{tx.timestamp}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#151c27]">{tx.memberName}</div>
                      <div className="text-[11px] text-[#737782]">{tx.memberNo}</div>
                    </td>
                    <td className="py-3 px-4 text-[#424751]">{tx.type}</td>
                    <td className="py-3 px-4 text-[12px] text-[#424751]">{tx.channel}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#004287]">
                      {FORMAT_RUPIAH(tx.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onOpenReceipt(tx)}
                        className="p-1 text-[#004287] hover:bg-[#e7eefe] rounded"
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
      )}
    </div>
  );
};
