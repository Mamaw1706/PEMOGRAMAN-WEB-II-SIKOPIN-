import React, { useState } from 'react';
import { Member, FORMAT_RUPIAH } from '../types';

interface AjukanPinjamanViewProps {
  members: Member[];
  selectedMember?: Member | null;
  onNavigate: (view: any) => void;
  onSubmitLoan: (loanData: any) => void;
}

export const AjukanPinjamanView: React.FC<AjukanPinjamanViewProps> = ({
  members,
  selectedMember,
  onNavigate,
  onSubmitLoan,
}) => {
  const [currentMemberId, setCurrentMemberId] = useState(
    selectedMember ? selectedMember.id : members[0]?.id || ''
  );
  const [loanAmount, setLoanAmount] = useState<number>(25000000);
  const [productType, setProductType] = useState<string>('modal-usaha');
  const [tenorMonths, setTenorMonths] = useState<number>(12);
  const [purpose, setPurpose] = useState<string>(
    'Pengembangan inventaris usaha warung sembako dan modal kerja tambahan.'
  );
  const [collateralType, setCollateralType] = useState<string>('bpkb');
  const [collateralValue, setCollateralValue] = useState<number>(28000000);
  const [isSuccessToast, setIsSuccessToast] = useState<boolean>(false);

  const activeMember =
    members.find((m) => m.id === currentMemberId) || members[0];

  // Financial calculations
  const interestRatePerMonth =
    productType === 'modal-usaha'
      ? 0.012
      : productType === 'konsumtif'
      ? 0.015
      : 0.01;

  const pokokPerMonth = Math.round(loanAmount / tenorMonths);
  const bungaPerMonth = Math.round(loanAmount * interestRatePerMonth);
  const angsuranPerMonth = pokokPerMonth + bungaPerMonth;

  const provisiAdmin = Math.round(loanAmount * 0.01);
  const asuransiKredit = Math.round(loanAmount * 0.005);
  const totalPotonganAwal = provisiAdmin + asuransiKredit;
  const danaBersihCair = loanAmount - totalPotonganAwal;
  const totalPelunasan = angsuranPerMonth * tenorMonths;

  const collateralRatio =
    loanAmount > 0 ? Math.round((collateralValue / loanAmount) * 100) : 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitLoan({
      memberName: activeMember.name,
      memberNo: activeMember.memberNo,
      score: activeMember.skor,
      initials: activeMember.initials,
      avatarBg: activeMember.avatarBg,
      tenor: `${tenorMonths} Bln`,
      loanType:
        productType === 'modal-usaha'
          ? 'Pinjaman Modal Usaha'
          : productType === 'konsumtif'
          ? 'Pinjaman Multiguna'
          : 'Pinjaman Investasi',
      amount: loanAmount,
      status: 'Menunggu Verifikasi Pengurus',
      statusColor: 'bg-[#a72f2e]',
      actionLabel: 'Review',
    });

    setIsSuccessToast(true);
    setTimeout(() => {
      setIsSuccessToast(false);
      onNavigate('dashboard-operasional');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Toast feedback */}
      {isSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#006e2b] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined">check_circle</span>
          <div>
            <div className="font-bold text-[14px]">Pengajuan Berhasil Dikirim!</div>
            <div className="text-[12px]">Nomor Tiket: #PJ-202509-088 telah diteruskan ke surveyor.</div>
          </div>
        </div>
      )}

      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#737782] mb-1">
            <button
              onClick={() => onNavigate('dashboard-operasional')}
              className="hover:text-[#004287] transition-colors"
            >
              Pinjaman
            </button>
            <span>/</span>
            <span>Pengajuan Pinjaman</span>
            <span>/</span>
            <span className="text-[#151c27] font-semibold">
              Ajukan Pinjaman Baru
            </span>
          </div>
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#151c27] tracking-tight">
            Ajukan Pinjaman Baru
          </h1>
          <p className="text-[13px] text-[#424751]">
            Formulir analisis kelayakan kredit, kalkulasi bunga anuitas, dan taksiran agunan jaminan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#f0f3ff] border border-[#c2c6d3] text-[#004287] font-mono text-[12px] font-bold">
            Draft #PJ-202509-088
          </span>
          <span className="text-[12px] text-[#737782]">15 September 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form Sections */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Section 1: Data Anggota Peminjam */}
          <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#c2c6d3]/40 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#004287] text-white text-[12px] font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="font-bold text-[16px] text-[#151c27]">
                Data Anggota Peminjam
              </h2>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1.5">
                Pilih Anggota Terdaftar
              </label>
              <select
                value={currentMemberId}
                onChange={(e) => setCurrentMemberId(e.target.value)}
                className="w-full h-11 px-3 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[14px] text-[#151c27] font-semibold focus:bg-white focus:outline-none focus:border-[#004287]"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.memberNo}) - Skor: {m.skor}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Member Credit Standing Badge Strip */}
            {activeMember && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40">
                  <span className="text-[11px] text-[#737782] block">Skor Kredit</span>
                  <span className="text-[14px] font-bold text-[#004287]">
                    {activeMember.skor}
                  </span>
                </div>
                <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40">
                  <span className="text-[11px] text-[#737782] block">Plafon Maksimal</span>
                  <span className="text-[14px] font-bold text-[#151c27]">
                    {FORMAT_RUPIAH(activeMember.plafonMaksimal)}
                  </span>
                </div>
                <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40">
                  <span className="text-[11px] text-[#737782] block">Pinjaman Aktif</span>
                  <span className="text-[14px] font-bold text-[#006e2b]">
                    {FORMAT_RUPIAH(activeMember.totalPinjamanAktif)} (Lancar)
                  </span>
                </div>
                <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40">
                  <span className="text-[11px] text-[#737782] block">Total Simpanan</span>
                  <span className="text-[14px] font-bold text-[#004287]">
                    {FORMAT_RUPIAH(activeMember.simpananPokok + activeMember.simpananWajib)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Detail Pembiayaan & Tenor */}
          <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#c2c6d3]/40 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#004287] text-white text-[12px] font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="font-bold text-[16px] text-[#151c27]">
                Detail Pembiayaan &amp; Tenor
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-[#424751] mb-1">
                  Nominal Pinjaman Diajukan (Rp) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#737782]">
                    Rp
                  </span>
                  <input
                    type="number"
                    min="1000000"
                    max={activeMember?.plafonMaksimal || 100000000}
                    step="500000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                    className="w-full h-11 pl-11 pr-3 bg-white border border-[#c2c6d3] rounded-lg text-[16px] font-bold text-[#151c27] focus:outline-none focus:border-[#004287]"
                    required
                  />
                </div>
                <span className="text-[11px] text-[#737782] mt-1 block">
                  Maksimal plafon anggota: {FORMAT_RUPIAH(activeMember?.plafonMaksimal || 50000000)}
                </span>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#424751] mb-1">
                  Produk Pinjaman Koperasi
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
                >
                  <option value="modal-usaha">
                    Pinjaman Modal Usaha (1.2% flat/bln)
                  </option>
                  <option value="konsumtif">
                    Pinjaman Konsumtif / Multiguna (1.5% flat/bln)
                  </option>
                  <option value="investasi">
                    Pinjaman Investasi Produktif (1.0% flat/bln)
                  </option>
                </select>
              </div>
            </div>

            {/* Tenor Selector Buttons */}
            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-2">
                Pilih Jangka Waktu (Tenor)
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {[6, 12, 24, 36].map((tenor) => (
                  <button
                    key={tenor}
                    type="button"
                    onClick={() => setTenorMonths(tenor)}
                    className={`py-3 rounded-lg border text-center transition-all ${
                      tenorMonths === tenor
                        ? 'border-[#004287] bg-[#004287] text-white font-bold shadow-sm'
                        : 'border-[#c2c6d3] bg-white text-[#424751] hover:bg-[#f0f3ff] font-medium'
                    }`}
                  >
                    <div className="text-[15px]">{tenor} Bulan</div>
                    <div className={`text-[10px] ${tenorMonths === tenor ? 'text-[#aac7ff]' : 'text-[#737782]'}`}>
                      {tenor <= 12 ? 'Jangka Pendek' : 'Jangka Menengah'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#424751] mb-1">
                Tujuan Penggunaan Pinjaman
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                rows={3}
                className="w-full p-3 border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
                placeholder="Jelaskan kebutuhan peruntukan modal..."
              />
            </div>
          </div>

          {/* Section 3: Dokumen & Jaminan (Agunan) */}
          <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#c2c6d3]/40 pb-3">
              <span className="w-6 h-6 rounded-full bg-[#004287] text-white text-[12px] font-bold flex items-center justify-center">
                3
              </span>
              <h2 className="font-bold text-[16px] text-[#151c27]">
                Dokumen &amp; Jaminan (Agunan)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-[#424751] mb-1">
                  Jenis Jaminan / Agunan
                </label>
                <select
                  value={collateralType}
                  onChange={(e) => setCollateralType(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[13px] text-[#151c27] focus:outline-none focus:border-[#004287]"
                >
                  <option value="bpkb">BPKB Kendaraan Bermotor (Roda 2 / 4)</option>
                  <option value="shm">Sertifikat Hak Milik (SHM / Tanah)</option>
                  <option value="simpanan">Bilyet Simpanan Berjangka KopKita</option>
                  <option value="emas">Sertifikat Emas Batangan Antam</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#424751] mb-1">
                  Nilai Taksiran Agunan (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-[#737782] text-[13px]">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={collateralValue}
                    onChange={(e) => setCollateralValue(Number(e.target.value) || 0)}
                    className="w-full h-10 pl-10 pr-3 border border-[#c2c6d3] rounded-lg text-[14px] font-bold text-[#151c27] focus:outline-none focus:border-[#004287]"
                  />
                </div>
              </div>
            </div>

            {/* Collateral Ratio Indicator */}
            <div className="p-3 bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]/40 flex items-center justify-between text-[12px]">
              <div>
                <span className="text-[#424751]">Rasio Agunan terhadap Pinjaman: </span>
                <span className="font-bold text-[#004287] text-[13px]">
                  {collateralRatio}%
                </span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                  collateralRatio >= 100
                    ? 'bg-[#86fb97]/40 text-[#002108]'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {collateralRatio >= 100 ? 'Memenuhi Syarat (Aman)' : 'Perlu Tambahan Agunan'}
              </span>
            </div>

            {/* Attached Files List */}
            <div className="space-y-2 pt-1">
              <div className="text-[12px] font-semibold text-[#151c27]">
                Berkas Terlampir yang Telah Tervalidasi:
              </div>
              <div className="p-2.5 rounded-lg border border-[#c2c6d3]/40 flex items-center justify-between bg-white text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004287]">
                    description
                  </span>
                  <div>
                    <span className="font-medium text-[#151c27]">
                      BPKB_Motor_Luqmanul_2023.pdf
                    </span>
                    <span className="text-[#737782] text-[11px] block">
                      1.8 MB • Nomor Polisi: B 4821 TKD
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#006e2b] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Sah Fisik
                </span>
              </div>

              <div className="p-2.5 rounded-lg border border-[#c2c6d3]/40 flex items-center justify-between bg-white text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004287]">
                    badge
                  </span>
                  <div>
                    <span className="font-medium text-[#151c27]">
                      KTP_KartuKeluarga_Dukcapil.pdf
                    </span>
                    <span className="text-[#737782] text-[11px] block">
                      1.2 MB • NIK Terverifikasi Dukcapil
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#006e2b] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Dukcapil Valid
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('dashboard-operasional')}
              className="px-5 py-2.5 text-[13px] font-semibold text-[#424751] hover:bg-[#f0f3ff] rounded-lg border border-[#c2c6d3]"
            >
              Simpan Sebagai Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1e5aa8] hover:bg-[#004287] text-white rounded-lg text-[13px] font-semibold shadow-md flex items-center gap-2 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Ajukan Pinjaman Sekarang</span>
            </button>
          </div>
        </form>

        {/* Right 1 Col: Sticky Real-time Loan Calculator */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#c2c6d3]/60 shadow-md sticky top-[90px] space-y-5">
            <div className="border-b border-[#c2c6d3]/40 pb-3">
              <span className="text-[11px] font-bold text-[#004287] uppercase tracking-wider">
                Simulasi Kredit Real-time
              </span>
              <h3 className="text-[18px] font-bold text-[#151c27]">
                Kalkulator Angsuran
              </h3>
            </div>

            {/* Monthly Installment Highlight */}
            <div className="p-4 bg-[#f0f3ff] rounded-xl border border-[#004287]/20 text-center">
              <span className="text-[12px] text-[#424751] block mb-1">
                Estimasi Angsuran Bulanan:
              </span>
              <div className="text-[24px] font-bold text-[#004287] font-mono">
                {FORMAT_RUPIAH(angsuranPerMonth)}
              </div>
              <span className="text-[11px] text-[#737782] block mt-1">
                per bulan selama {tenorMonths} bulan
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-[13px]">
              <div className="flex justify-between text-[#424751]">
                <span>Pokok Pinjaman:</span>
                <span className="font-mono font-medium text-[#151c27]">
                  {FORMAT_RUPIAH(loanAmount)}
                </span>
              </div>

              <div className="flex justify-between text-[#424751]">
                <span>Pokok Angsuran / Bln:</span>
                <span className="font-mono text-[#151c27]">
                  {FORMAT_RUPIAH(pokokPerMonth)}
                </span>
              </div>

              <div className="flex justify-between text-[#424751]">
                <span>Jasa Bunga ({(interestRatePerMonth * 100).toFixed(1)}%) / Bln:</span>
                <span className="font-mono text-[#151c27]">
                  {FORMAT_RUPIAH(bungaPerMonth)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#c2c6d3]/30 space-y-2 text-[12px]">
                <div className="flex justify-between text-[#737782]">
                  <span>Biaya Provisi &amp; Admin (1%):</span>
                  <span className="font-mono">{FORMAT_RUPIAH(provisiAdmin)}</span>
                </div>
                <div className="flex justify-between text-[#737782]">
                  <span>Asuransi Jiwa &amp; Kredit (0.5%):</span>
                  <span className="font-mono">{FORMAT_RUPIAH(asuransiKredit)}</span>
                </div>
                <div className="flex justify-between text-[#ba1a1a] font-medium">
                  <span>Total Potongan Awal:</span>
                  <span className="font-mono">-{FORMAT_RUPIAH(totalPotonganAwal)}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#c2c6d3]/30 flex justify-between items-center text-[13px] font-semibold">
                <span className="text-[#006e2b]">Dana Bersih Dicairkan:</span>
                <span className="text-[#006e2b] font-mono text-[15px] font-bold">
                  {FORMAT_RUPIAH(danaBersihCair)}
                </span>
              </div>

              <div className="flex justify-between text-[12px] text-[#424751] pt-1">
                <span>Total Nilai Pelunasan:</span>
                <span className="font-mono font-medium text-[#151c27]">
                  {FORMAT_RUPIAH(totalPelunasan)}
                </span>
              </div>
            </div>

            {/* DSR Indicator */}
            <div className="pt-3 border-t border-[#c2c6d3]/40">
              <div className="flex justify-between text-[11px] mb-1 font-medium">
                <span className="text-[#424751]">Kapasitas Bayar (DSR):</span>
                <span className="text-[#006e2b] font-bold">28.5% (Aman &lt; 35%)</span>
              </div>
              <div className="w-full bg-[#f0f3ff] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006e2b] h-full w-[28.5%] rounded-full"></div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900 leading-tight">
              <span className="font-bold">Ketentuan KopKita:</span> Persetujuan kredit di atas Rp20.000.000 membutuhkan verifikasi lapangan oleh 2 orang pengurus &amp; persetujuan Ketua KSP.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
