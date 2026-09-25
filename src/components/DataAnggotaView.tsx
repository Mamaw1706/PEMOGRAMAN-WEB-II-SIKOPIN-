import React, { useState } from 'react';
import { Member, FORMAT_RUPIAH } from '../types';

interface DataAnggotaViewProps {
  members: Member[];
  onOpenNewMember: () => void;
  onNavigate: (view: any) => void;
  onSelectMemberForLoan?: (member: Member) => void;
}

export const DataAnggotaView: React.FC<DataAnggotaViewProps> = ({
  members,
  onOpenNewMember,
  onNavigate,
  onSelectMemberForLoan,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedMemberModal, setSelectedMemberModal] = useState<Member | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredMembers = members.filter((m) => {
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.memberNo.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.nik.includes(q) ||
        m.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredMembers.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
              Dashboard
            </button>
            <span>/</span>
            <span>Keanggotaan</span>
            <span>/</span>
            <span className="text-[#151c27] font-semibold">Data Anggota</span>
          </div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Data Anggota Koperasi
          </h1>
          <p className="text-[13px] text-[#424751]">
            Kelola data registrasi, simpanan, plafon pinjaman, dan verifikasi anggota KopKita.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              // Export CSV action
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                'ID,Nama,No Anggota,Email,Telepon,Status\n' +
                members.map((m) => `${m.id},"${m.name}",${m.memberNo},${m.email},${m.phone},${m.status}`).join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'Data_Anggota_KopKita.csv');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="h-10 px-3.5 bg-white hover:bg-[#f0f3ff] text-[#424751] font-semibold text-[13px] rounded-lg border border-[#c2c6d3] transition-colors flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Ekspor CSV/Excel</span>
          </button>

          <button
            onClick={onOpenNewMember}
            className="h-10 px-4 bg-[#1e5aa8] hover:bg-[#004287] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Tambah Anggota Baru</span>
          </button>
        </div>
      </div>

      {/* 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-[#424751]">
              Total Anggota Terdaftar
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#d6e3ff] flex items-center justify-center text-[#004287]">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </div>
          </div>
          <div className="text-[24px] font-bold text-[#151c27]">1.248</div>
          <div className="text-[11px] text-[#006e2b] font-medium mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            +12 bulan ini
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-[#424751]">
              Anggota Aktif
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#86fb97]/40 flex items-center justify-center text-[#006e2b]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="text-[24px] font-bold text-[#151c27]">1.185</div>
          <div className="text-[11px] text-[#737782] font-medium mt-1">
            95% dari total keseluruhan
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-[#424751]">
              Menunggu Verifikasi
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </div>
          </div>
          <div className="text-[24px] font-bold text-[#ba1a1a]">24</div>
          <div className="text-[11px] text-[#ba1a1a] font-medium mt-1">
            Perlu ditinjau pengurus
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737782] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama, nomor anggota, NIK, atau no. telepon..."
            className="w-full h-10 pl-10 pr-4 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[#151c27] text-[13px] focus:bg-white focus:outline-none focus:border-[#004287]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[13px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[#151c27] focus:outline-none focus:border-[#004287]"
          >
            <option value="all">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-3 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[#151c27] focus:outline-none focus:border-[#004287]"
          >
            <option value="all">Semua Kategori</option>
            <option value="biasa">Anggota Biasa</option>
            <option value="luar-biasa">Anggota Luar Biasa</option>
            <option value="pengurus">Pengurus / Pengawas</option>
          </select>

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCategoryFilter('all');
            }}
            className="h-10 px-3 text-[#424751] hover:bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg"
            title="Reset Filter"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] border-collapse">
            <thead>
              <tr className="bg-[#f0f3ff] text-[#424751] font-semibold border-b border-[#c2c6d3]/60 text-[12px]">
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedIds.length === filteredMembers.length &&
                      filteredMembers.length > 0
                    }
                    className="rounded border-[#c2c6d3] text-[#004287] focus:ring-[#004287]"
                  />
                </th>
                <th className="py-3 px-4">NAMA &amp; IDENTITAS</th>
                <th className="py-3 px-4">NOMOR ANGGOTA</th>
                <th className="py-3 px-4">NO. TELEPON / WA</th>
                <th className="py-3 px-4">TANGGAL BERGABUNG</th>
                <th className="py-3 px-4">SKOR KREDIT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d3]/30">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-[#f9f9ff] transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(member.id)}
                      onChange={() => handleToggleSelect(member.id)}
                      className="rounded border-[#c2c6d3] text-[#004287] focus:ring-[#004287]"
                    />
                  </td>

                  {/* Name & Email */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 ${member.avatarBg}`}
                      >
                        {member.initials}
                      </div>
                      <div>
                        <button
                          onClick={() => setSelectedMemberModal(member)}
                          className="font-semibold text-[#151c27] hover:text-[#004287] text-left block"
                        >
                          {member.name}
                        </button>
                        <div className="text-[11px] text-[#737782]">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Member No */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[#151c27] font-medium">
                      {member.memberNo}
                    </span>
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4 text-[#424751] font-mono text-[12px]">
                    {member.phone}
                  </td>

                  {/* Join Date */}
                  <td className="py-3.5 px-4 text-[#424751]">
                    {member.joinDate}
                  </td>

                  {/* Skor Kredit */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#d6e3ff] text-[#004287] text-[11px] font-bold">
                      {member.skor}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {member.status === 'Aktif' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86fb97]/40 text-[#002108] text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
                        Aktif
                      </span>
                    )}
                    {member.status === 'Menunggu Verifikasi' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        Menunggu Verifikasi
                      </span>
                    )}
                    {member.status === 'Nonaktif' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e2e8f8] text-[#737782] text-[11px] font-medium">
                        Nonaktif
                      </span>
                    )}
                  </td>

                  {/* Aksi */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedMemberModal(member)}
                        className="p-1.5 text-[#004287] hover:bg-[#e7eefe] rounded"
                        title="Lihat Detail Profil"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          visibility
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          if (onSelectMemberForLoan) {
                            onSelectMemberForLoan(member);
                            onNavigate('pengajuan-pinjaman');
                          }
                        }}
                        className="p-1.5 text-[#006e2b] hover:bg-emerald-50 rounded"
                        title="Ajukan Pinjaman untuk Anggota Ini"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          payments
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-[#c2c6d3]/40 bg-[#f0f3ff]/50 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#424751] gap-2">
          <span>
            Menampilkan 1-{filteredMembers.length} dari {members.length} anggota terdaftar
          </span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-[#c2c6d3] rounded bg-white text-[#737782]" disabled>
              Sebelumnya
            </button>
            <button className="px-3 py-1 border border-[#004287] bg-[#004287] text-white rounded font-bold">
              1
            </button>
            <button className="px-3 py-1 border border-[#c2c6d3] rounded bg-white text-[#151c27] hover:bg-[#e7eefe]">
              Berikutnya
            </button>
          </div>
        </div>
      </div>

      {/* Member Profile Detail Modal */}
      {selectedMemberModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedMemberModal(null)}
              className="absolute right-4 top-4 text-[#737782] hover:text-[#151c27] p-1 rounded-lg hover:bg-[#f0f3ff]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-3 border-b border-[#c2c6d3]/40 pb-4 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[16px] ${selectedMemberModal.avatarBg}`}
              >
                {selectedMemberModal.initials}
              </div>
              <div>
                <h3 className="font-bold text-[18px] text-[#151c27]">
                  {selectedMemberModal.name}
                </h3>
                <p className="text-[12px] font-mono text-[#737782]">
                  {selectedMemberModal.memberNo} • NIK: {selectedMemberModal.nik}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#f0f3ff] rounded-lg">
                <div>
                  <span className="text-[11px] text-[#737782] block">Skor Kredit</span>
                  <span className="font-bold text-[#004287] text-[14px]">
                    {selectedMemberModal.skor}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#737782] block">Plafon Maksimal</span>
                  <span className="font-bold text-[#151c27] text-[14px]">
                    {FORMAT_RUPIAH(selectedMemberModal.plafonMaksimal)}
                  </span>
                </div>
              </div>

              <div className="border border-[#c2c6d3]/40 rounded-lg p-3 space-y-2">
                <div className="font-semibold text-[#151c27] text-[12px] border-b border-[#c2c6d3]/20 pb-1">
                  Rincian Saldo Simpanan Anggota
                </div>
                <div className="flex justify-between">
                  <span className="text-[#424751]">Simpanan Pokok:</span>
                  <span className="font-mono font-medium">
                    {FORMAT_RUPIAH(selectedMemberModal.simpananPokok)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#424751]">Simpanan Wajib:</span>
                  <span className="font-mono font-medium">
                    {FORMAT_RUPIAH(selectedMemberModal.simpananWajib)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#424751]">Simpanan Sukarela:</span>
                  <span className="font-mono font-semibold text-[#006e2b]">
                    {FORMAT_RUPIAH(selectedMemberModal.simpananSukarela)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#e7eefe]/50 rounded-lg">
                <div>
                  <span className="text-[11px] text-[#424751] block">Total Pinjaman Aktif:</span>
                  <span className="font-bold text-[14px] text-[#004287]">
                    {FORMAT_RUPIAH(selectedMemberModal.totalPinjamanAktif)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (onSelectMemberForLoan) {
                      onSelectMemberForLoan(selectedMemberModal);
                      setSelectedMemberModal(null);
                      onNavigate('pengajuan-pinjaman');
                    }
                  }}
                  className="px-3 py-1.5 bg-[#004287] text-white text-[12px] font-semibold rounded-lg hover:bg-[#1e5aa8]"
                >
                  Ajukan Pinjaman Baru
                </button>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#c2c6d3]/40 text-right">
              <button
                onClick={() => setSelectedMemberModal(null)}
                className="px-4 py-2 bg-[#f0f3ff] text-[#424751] rounded-lg text-[13px] font-semibold hover:bg-[#e7eefe]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
