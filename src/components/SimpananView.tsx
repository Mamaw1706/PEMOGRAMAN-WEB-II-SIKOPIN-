import React from 'react';
import { Member, FORMAT_RUPIAH } from '../types';

interface SimpananViewProps {
  type: 'pokok' | 'wajib' | 'sukarela';
  members: Member[];
  onOpenNewTransaction: () => void;
  onNavigate: (view: any) => void;
}

export const SimpananView: React.FC<SimpananViewProps> = ({
  type,
  members,
  onOpenNewTransaction,
  onNavigate,
}) => {
  const title =
    type === 'pokok'
      ? 'Simpanan Pokok Anggota'
      : type === 'wajib'
      ? 'Simpanan Wajib Bulanan'
      : 'Simpanan Sukarela (Tabungan)';

  const desc =
    type === 'pokok'
      ? 'Simpanan modal awal anggota sebesar Rp500.000 saat pendaftaran, tidak dapat ditarik selama masih menjadi anggota aktif.'
      : type === 'wajib'
      ? 'Kewajiban iuran bulanan anggota (Rp150.000/bulan) untuk memperkuat permodalan bersama.'
      : 'Simpanan fleksibel dengan bagi hasil bersaing yang dapat disetor dan ditarik sewaktu-waktu.';

  const totalNominal = members.reduce((sum, m) => {
    if (type === 'pokok') return sum + m.simpananPokok;
    if (type === 'wajib') return sum + m.simpananWajib;
    return sum + m.simpananSukarela;
  }, 0);

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
              Simpanan
            </button>
            <span>/</span>
            <span className="text-[#151c27] font-semibold">{title}</span>
          </div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#151c27]">
            {title}
          </h1>
          <p className="text-[13px] text-[#424751]">{desc}</p>
        </div>

        <button
          onClick={onOpenNewTransaction}
          className="h-10 px-4 bg-[#1e5aa8] hover:bg-[#004287] text-white font-semibold text-[13px] rounded-lg shadow-sm flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Setor Simpanan Baru</span>
        </button>
      </div>

      {/* Summary Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60">
          <span className="text-[13px] text-[#424751] block mb-1">
            Total Dana Terhimpun
          </span>
          <div className="text-[24px] font-bold text-[#004287]">
            {FORMAT_RUPIAH(totalNominal)}
          </div>
          <span className="text-[11px] text-[#006e2b] font-medium mt-1 block">
            +9.8% dari periode lalu
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60">
          <span className="text-[13px] text-[#424751] block mb-1">
            Jumlah Anggota Berpartisipasi
          </span>
          <div className="text-[24px] font-bold text-[#151c27]">
            {members.length} Orang
          </div>
          <span className="text-[11px] text-[#737782] mt-1 block">
            Kepatuhan 98.2%
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60">
          <span className="text-[13px] text-[#424751] block mb-1">
            Estimasi SHU Simpanan
          </span>
          <div className="text-[24px] font-bold text-[#006e2b]">
            8.5% p.a.
          </div>
          <span className="text-[11px] text-[#737782] mt-1 block">
            Berdasarkan proyeksi tutup buku tahun berjalan
          </span>
        </div>
      </div>

      {/* Table of Members & Savings */}
      <div className="bg-white rounded-xl border border-[#c2c6d3]/60 overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="p-4 border-b border-[#c2c6d3]/40 flex items-center justify-between">
          <h3 className="font-bold text-[15px] text-[#151c27]">
            Rincian Saldo per Anggota
          </h3>
          <span className="text-[12px] text-[#737782]">
            Data diperbarui per hari ini
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                <th className="py-3 px-4">ANGGOTA</th>
                <th className="py-3 px-4">NO. IDENTITAS ANGGOTA</th>
                <th className="py-3 px-4">STATUS KEANGGOTAAN</th>
                <th className="py-3 px-4 text-right">SALDO TERCATAT</th>
                <th className="py-3 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d3]/30">
              {members.map((m) => {
                const amount =
                  type === 'pokok'
                    ? m.simpananPokok
                    : type === 'wajib'
                    ? m.simpananWajib
                    : m.simpananSukarela;

                return (
                  <tr key={m.id} className="hover:bg-[#f9f9ff]">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#151c27]">{m.name}</div>
                      <div className="text-[11px] text-[#737782]">{m.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono">{m.memberNo}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#86fb97]/40 text-[#002108] text-[11px] font-semibold">
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#004287]">
                      {FORMAT_RUPIAH(amount)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={onOpenNewTransaction}
                        className="px-2.5 py-1 text-[11px] bg-[#f0f3ff] text-[#004287] rounded border border-[#c2c6d3] font-medium hover:bg-[#e7eefe]"
                      >
                        + Setor
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
