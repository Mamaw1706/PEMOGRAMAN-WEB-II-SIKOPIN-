import React, { useState } from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [simpananOpen, setSimpananOpen] = useState(true);
  const [pinjamanOpen, setPinjamanOpen] = useState(true);
  const [logoError, setLogoError] = useState(false);

  const handleNav = (view: ViewType) => {
    onNavigate(view);
    if (onCloseMobile) onCloseMobile();
  };

  const isDashboardActive =
    currentView === 'dashboard' ||
    currentView === 'dashboard-operasional' ||
    currentView === 'dashboard-ringkasan';

  const isSimpananActive =
    currentView === 'simpanan-pokok' ||
    currentView === 'simpanan-wajib' ||
    currentView === 'simpanan-sukarela';

  const isPinjamanActive =
    currentView === 'pengajuan-pinjaman' ||
    currentView === 'angsuran-pinjaman' ||
    currentView === 'riwayat-pinjaman';

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-[#0F172A]/40 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] bg-white z-50 flex flex-col justify-between border-r border-[#c2c6d3]/40 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Header */}
          <div className="h-[72px] px-4 flex items-center justify-between border-b border-[#c2c6d3]/30">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNav('dashboard-operasional')}
            >
              {!logoError ? (
                <img
                  alt="Logo KopKita"
                  className="h-8 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1URsiLaAP6lv721Mem8Kl6aLp6Ho6A0fl3-LpJ166LlOiMJIVdr0Yk1gidNmvMicQG1oVTmZogFj55S-V5ItRlGIE8_AAGSDgWGAhi7MU-F5kw8Tzxkr92HDKJBFbMztP0095k4YtazX0OFiNvSkV6gZTdXaUT2r_MJjr0kt8E7cklzvR1M2j5QWqo4p_kyKmrn1By4IUsBeSgFDOSHzOrmtNE3yKR_wu5MJIV7mTp_xU-h7Hs31jJfgug"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[#d6e3ff] text-[#004287] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">account_balance</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-[#004287] text-[17px] leading-tight flex items-center gap-1">
                  KopKita
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
                </span>
                <span className="text-[11px] text-[#424751] truncate">
                  KSP Sejahtera Utama
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1 rounded text-[#737782] hover:bg-[#f0f3ff] lg:hidden"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 p-2 overflow-y-auto max-h-[calc(100vh-170px)] select-none">
            {/* Dashboard Parent */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleNav('dashboard-operasional')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors font-semibold text-[14px] ${
                  isDashboardActive
                    ? 'bg-[#E8F1FC] text-[#004287]'
                    : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                }`}
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">
                    dashboard
                  </span>
                  <span>Dashboard</span>
                </div>
                <span className="text-[10px] bg-[#d6e3ff] text-[#004287] px-1.5 py-0.5 rounded font-bold">
                  {currentView === 'dashboard-ringkasan' ? 'Ringkas' : 'Ops'}
                </span>
              </button>

              {/* Sub-toggle between Dashboard Operasional and Ringkasan */}
              <div className="flex flex-col pl-9 pr-1 gap-1 pt-0.5 pb-1">
                <button
                  onClick={() => handleNav('dashboard-operasional')}
                  className={`text-left px-2.5 py-1 rounded text-[12px] transition-colors ${
                    currentView === 'dashboard-operasional' || currentView === 'dashboard'
                      ? 'bg-[#d6e3ff]/70 text-[#004287] font-semibold'
                      : 'text-[#424751] hover:bg-[#f0f3ff]'
                  }`}
                  type="button"
                >
                  • Dashboard Operasional
                </button>
                <button
                  onClick={() => handleNav('dashboard-ringkasan')}
                  className={`text-left px-2.5 py-1 rounded text-[12px] transition-colors ${
                    currentView === 'dashboard-ringkasan'
                      ? 'bg-[#d6e3ff]/70 text-[#004287] font-semibold'
                      : 'text-[#424751] hover:bg-[#f0f3ff]'
                  }`}
                  type="button"
                >
                  • Ringkasan & Tren Simpan Pinjam
                </button>
              </div>
            </div>

            {/* Data Anggota */}
            <button
              onClick={() => handleNav('data-anggota')}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-colors text-[14px] ${
                currentView === 'data-anggota'
                  ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                  : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27] font-medium'
              }`}
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px]">
                  group
                </span>
                <span>Data Anggota</span>
              </div>
              <span className="text-[11px] bg-[#f0f3ff] text-[#424751] font-semibold px-2 py-0.5 rounded-full">
                1.248
              </span>
            </button>

            {/* Simpanan Section */}
            <div className="flex flex-col gap-0.5 pt-1">
              <button
                onClick={() => setSimpananOpen(!simpananOpen)}
                className={`flex items-center justify-between px-3.5 py-2 rounded-lg transition-colors text-[14px] ${
                  isSimpananActive
                    ? 'text-[#004287] font-semibold'
                    : 'text-[#424751] hover:bg-[#e7eefe] font-medium'
                }`}
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">
                    account_balance_wallet
                  </span>
                  <span>Simpanan</span>
                </div>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    simpananOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {simpananOpen && (
                <div className="flex flex-col pl-9 pr-1 gap-1">
                  <button
                    onClick={() => handleNav('simpanan-pokok')}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-[12px] ${
                      currentView === 'simpanan-pokok'
                        ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                        : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                    }`}
                    type="button"
                  >
                    Simpanan Pokok
                  </button>
                  <button
                    onClick={() => handleNav('simpanan-wajib')}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-[12px] ${
                      currentView === 'simpanan-wajib'
                        ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                        : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                    }`}
                    type="button"
                  >
                    Simpanan Wajib
                  </button>
                  <button
                    onClick={() => handleNav('simpanan-sukarela')}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-[12px] ${
                      currentView === 'simpanan-sukarela'
                        ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                        : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                    }`}
                    type="button"
                  >
                    Simpanan Sukarela
                  </button>
                </div>
              )}
            </div>

            {/* Pinjaman Section */}
            <div className="flex flex-col gap-0.5 pt-1">
              <button
                onClick={() => setPinjamanOpen(!pinjamanOpen)}
                className={`flex items-center justify-between px-3.5 py-2 rounded-lg transition-colors text-[14px] ${
                  isPinjamanActive
                    ? 'text-[#004287] font-semibold'
                    : 'text-[#424751] hover:bg-[#e7eefe] font-medium'
                }`}
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px]">
                    payments
                  </span>
                  <span>Pinjaman</span>
                </div>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    pinjamanOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {pinjamanOpen && (
                <div className="flex flex-col pl-9 pr-1 gap-1">
                  <button
                    onClick={() => handleNav('pengajuan-pinjaman')}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-[12px] flex items-center justify-between ${
                      currentView === 'pengajuan-pinjaman'
                        ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                        : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                    }`}
                    type="button"
                  >
                    <span>Pengajuan Pinjaman</span>
                    <span className="text-[10px] bg-[#83f894] text-[#002108] font-bold px-1.5 rounded">
                      Form
                    </span>
                  </button>
                  <button
                    onClick={() => handleNav('angsuran-pinjaman')}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-[12px] ${
                      currentView === 'angsuran-pinjaman'
                        ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                        : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                    }`}
                    type="button"
                  >
                    Angsuran
                  </button>
                  <button
                    onClick={() => handleNav('riwayat-pinjaman')}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-[12px] ${
                      currentView === 'riwayat-pinjaman'
                        ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                        : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27]'
                    }`}
                    type="button"
                  >
                    Riwayat Pinjaman
                  </button>
                </div>
              )}
            </div>

            {/* Laporan Keuangan */}
            <button
              onClick={() => handleNav('laporan-keuangan')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg transition-colors text-[14px] ${
                currentView === 'laporan-keuangan'
                  ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                  : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27] font-medium'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                assessment
              </span>
              <span>Laporan Keuangan</span>
            </button>

            {/* Pengaturan Akun */}
            <button
              onClick={() => handleNav('pengaturan-akun')}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg transition-colors text-[14px] ${
                currentView === 'pengaturan-akun'
                  ? 'bg-[#E8F1FC] text-[#004287] font-semibold'
                  : 'text-[#424751] hover:bg-[#e7eefe] hover:text-[#151c27] font-medium'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                settings
              </span>
              <span>Pengaturan Akun</span>
            </button>
          </nav>
        </div>

        {/* Bottom Footer Info */}
        <div className="p-4 border-t border-[#c2c6d3]/30 bg-[#f0f3ff]/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#424751] font-medium">
              KopKita Core
            </span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#e7eefe] text-[#424751] font-semibold">
              v2.4.0
            </span>
          </div>
          <p className="text-[12px] text-[#424751] leading-tight">
            Jam Operasional:
            <br />
            <span className="font-semibold text-[#151c27]">
              08:00 - 16:30 WIB
            </span>
          </p>
        </div>
      </aside>
    </>
  );
};
