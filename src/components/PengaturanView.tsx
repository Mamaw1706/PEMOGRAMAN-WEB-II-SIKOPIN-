import React, { useState } from 'react';

interface PengaturanViewProps {
  onNavigate: (view: any) => void;
}

export const PengaturanView: React.FC<PengaturanViewProps> = ({ onNavigate }) => {
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#737782] mb-1">
          <button
            onClick={() => onNavigate('dashboard-operasional')}
            className="hover:text-[#004287]"
          >
            Dashboard
          </button>
          <span>/</span>
          <span className="text-[#151c27] font-semibold">Pengaturan Akun &amp; Koperasi</span>
        </div>
        <h1 className="text-[22px] sm:text-[24px] font-bold text-[#151c27]">
          Pengaturan Koperasi &amp; Operasional
        </h1>
        <p className="text-[13px] text-[#424751]">
          Konfigurasi identitas legalitas, suku bunga permodalan, dan otorisasi pengurus KopKita.
        </p>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-[#006e2b] text-[13px] font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          <span>Perubahan pengaturan berhasil disimpan dan disinkronkan ke server.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identitas Koperasi */}
        <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <h2 className="text-[16px] font-bold text-[#151c27] border-b border-[#c2c6d3]/40 pb-2">
            Identitas &amp; Legalitas KSP
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Nama Resmi Koperasi
              </label>
              <input
                type="text"
                defaultValue="Koperasi Simpan Pinjam Sejahtera Utama (KopKita)"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Nomor Badan Hukum (Kemenkop)
              </label>
              <input
                type="text"
                defaultValue="518/BH/DISKOP/2012 / AHU-001928.AH.01.26"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Alamat Kantor Pusat
              </label>
              <input
                type="text"
                defaultValue="Jl. Jenderal Sudirman Kav. 45, Gedung Menara Koperasi Lt. 3, Jakarta"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Jam Operasional Teller
              </label>
              <input
                type="text"
                defaultValue="08:00 - 16:30 WIB (Senin - Jumat)"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
          </div>
        </div>

        {/* Kebijakan Simpan Pinjam */}
        <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <h2 className="text-[16px] font-bold text-[#151c27] border-b border-[#c2c6d3]/40 pb-2">
            Parameter Kebijakan Pinjaman &amp; Simpanan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Suku Bunga Pinjaman Modal (flat/bln)
              </label>
              <input
                type="text"
                defaultValue="1.2%"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Iuran Simpanan Wajib Bulanan
              </label>
              <input
                type="text"
                defaultValue="Rp150.000"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Simpanan Pokok Pendaftaran
              </label>
              <input
                type="text"
                defaultValue="Rp500.000"
                className="w-full h-10 px-3 border border-[#c2c6d3] rounded-lg text-[13px] focus:outline-none focus:border-[#004287]"
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#004287] hover:bg-[#1e5aa8] text-white font-semibold rounded-lg text-[13px] shadow-sm"
          >
            Simpan Konfigurasi
          </button>
        </div>
      </form>
    </div>
  );
};
