import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onOpenNewTransaction: () => void;
  onOpenMobileMenu: () => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewTransaction,
  onOpenMobileMenu,
  onSearchChange,
  searchQuery = '',
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-[72px] bg-white border-b border-[#c2c6d3]/40 z-40 px-4 sm:px-6 flex items-center justify-between shadow-[0_1px_4px_rgba(15,23,42,0.03)]">
        {/* Left Section: Mobile toggle & Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 rounded-lg text-[#424751] hover:bg-[#f0f3ff] lg:hidden"
            type="button"
            aria-label="Buka Menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737782] text-[20px] pointer-events-none">
              search
            </span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-16 bg-[#f0f3ff] border border-[#c2c6d3] rounded-lg text-[#151c27] text-[14px] placeholder:text-[#424751]/70 focus:outline-none focus:border-[#1e5aa8] focus:bg-white transition-all shadow-xs"
              placeholder="Cari nomor anggota, nama, transaksi..."
              type="text"
            />
            <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#e2e8f8] text-[#424751] text-[11px] font-semibold rounded border border-[#c2c6d3]/60">
              Ctrl + K
            </kbd>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0f3ff] text-[#424751] text-[12px] font-medium border border-[#c2c6d3]/30 whitespace-nowrap">
            <span className="material-symbols-outlined text-[16px] text-[#004287]">
              calendar_today
            </span>
            <span>Senin, 15 September 2025</span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* New Transaction Button */}
          <button
            onClick={onOpenNewTransaction}
            className="flex items-center gap-1.5 h-10 px-3.5 sm:px-4 bg-[#1e5aa8] hover:bg-[#004287] text-white font-medium text-[13px] sm:text-[14px] rounded-lg shadow-sm transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="hidden sm:inline">Transaksi Baru</span>
            <span className="sm:hidden">Catat</span>
          </button>

          {/* Notifications Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[#424751] hover:text-[#151c27] hover:bg-[#e7eefe] rounded-lg transition-colors"
              type="button"
              title="Notifikasi Operasional"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                4
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#c2c6d3]/60 py-3 z-50 text-left animate-in fade-in slide-in-from-top-2">
                <div className="px-4 pb-2 border-b border-[#c2c6d3]/30 flex items-center justify-between">
                  <span className="font-bold text-[14px] text-[#151c27]">
                    Pemberitahuan Sistem (4)
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[12px] text-[#004287] hover:underline"
                  >
                    Tandai Dibaca
                  </button>
                </div>
                <div className="divide-y divide-[#c2c6d3]/20 max-h-80 overflow-y-auto">
                  <div className="p-3 hover:bg-[#f0f3ff] transition-colors flex gap-2.5">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0 mt-0.5">
                      warning
                    </span>
                    <div>
                      <p className="text-[12px] text-[#151c27] font-semibold">
                        Andi Wijaya (AG-2019-0312)
                      </p>
                      <p className="text-[11px] text-[#424751]">
                        Angsuran ke-7 terlambat 14 hari. SP-1 siap diterbitkan.
                      </p>
                      <span className="text-[10px] text-[#737782]">2 jam lalu</span>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#f0f3ff] transition-colors flex gap-2.5">
                    <span className="material-symbols-outlined text-[#006e2b] text-[20px] shrink-0 mt-0.5">
                      payments
                    </span>
                    <div>
                      <p className="text-[12px] text-[#151c27] font-semibold">
                        Pencairan Pinjaman Disetujui
                      </p>
                      <p className="text-[11px] text-[#424751]">
                        Dewi Lestari Rp20.000.000 via Transfer Bank BRI berhasil diproses.
                      </p>
                      <span className="text-[10px] text-[#737782]">3 jam lalu</span>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#f0f3ff] transition-colors flex gap-2.5">
                    <span className="material-symbols-outlined text-[#004287] text-[20px] shrink-0 mt-0.5">
                      schedule
                    </span>
                    <div>
                      <p className="text-[12px] text-[#151c27] font-semibold">
                        Jatuh Tempo Besok: Luqmanul Fikri
                      </p>
                      <p className="text-[11px] text-[#424751]">
                        Nominal Rp2.500.000 (Angsuran Ke-5/12).
                      </p>
                      <span className="text-[10px] text-[#737782]">H-1 Pengingat</span>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#f0f3ff] transition-colors flex gap-2.5">
                    <span className="material-symbols-outlined text-[#a72f2e] text-[20px] shrink-0 mt-0.5">
                      assignment_ind
                    </span>
                    <div>
                      <p className="text-[12px] text-[#151c27] font-semibold">
                        Pengajuan Anggota Baru
                      </p>
                      <p className="text-[11px] text-[#424751]">
                        Ratna Kusuma Wardani menunggu verifikasi berkas KYC KTP.
                      </p>
                      <span className="text-[10px] text-[#737782]">Kemarin</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-[#c2c6d3]/30">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[12px] text-[#004287] font-semibold hover:underline"
                  >
                    Buka Pusat Notifikasi Lengkap
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 text-[#424751] hover:text-[#151c27] hover:bg-[#e7eefe] rounded-lg transition-colors"
            title="Bantuan Operasional"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">help_outline</span>
          </button>

          <div className="h-8 w-px bg-[#c2c6d3]/60 hidden sm:block"></div>

          {/* Profile User Info */}
          <div className="relative">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1e5aa8]/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALVRdiNbyvz11n6G3SdQ6UavUHhDUBIR03jUMSLjIMs4ig69OaSNeG7dKMw3V8POHEXcgTm72QQdbVbg8jas9xBjjTTgGN9PZAaFenXxxtwm_a1RGpqt5suAAsokFrV-9vyGVoceY39apMntNiV3z60hzBKkflWrOAknLYu9hmKzfzE96jhaJtK1DiNtQm84DHhlz70j69EuH84lP0kvjGHRodh-p_xiV3OHQCT5PUtEsXydEcS1M6hA"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[13px] text-[#151c27] font-semibold leading-tight">
                  Bambang Sudarmono, S.E.
                </span>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006e2b]"></span>
                  <span className="text-[11px] text-[#424751]">
                    Kepala Operasional
                  </span>
                </div>
              </div>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#c2c6d3]/60 py-2 z-50 text-left">
                <div className="px-4 py-2 border-b border-[#c2c6d3]/30">
                  <p className="text-[13px] font-bold text-[#151c27]">
                    Bambang Sudarmono
                  </p>
                  <p className="text-[11px] text-[#424751]">
                    bambang.sudarmono@kopkita.id
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#424751] hover:bg-[#f0f3ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    Profil Pengurus
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#424751] hover:bg-[#f0f3ff] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    Otorisasi Kredit
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-4 py-2 text-[13px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Keluar Sesi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Operational Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-[#0F172A]/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute right-4 top-4 text-[#737782] hover:text-[#151c27]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-2 text-[#004287] mb-3">
              <span className="material-symbols-outlined text-[28px]">help_center</span>
              <h3 className="font-bold text-[18px] text-[#151c27]">
                Bantuan & Prosedur Operasional KopKita
              </h3>
            </div>
            <div className="text-[13px] text-[#424751] space-y-3 leading-relaxed">
              <p>
                <strong>1. Pencatatan Transaksi Kas:</strong> Gunakan tombol biru{' '}
                <span className="bg-[#1e5aa8] text-white px-1.5 py-0.5 rounded text-[11px]">
                  Transaksi Baru
                </span>{' '}
                untuk mencatat setoran simpanan wajib/pokok, pembayaran cicilan angsuran, atau penarikan tunai teller.
              </p>
              <p>
                <strong>2. Pengajuan Pinjaman:</strong> Masuk ke menu{' '}
                <em>Pinjaman &gt; Pengajuan Pinjaman</em> untuk menghitung estimasi angsuran anuitas flat real-time dan kapasitas bayar (DSR).
              </p>
              <p>
                <strong>3. Rekonsiliasi & Tutup Buku:</strong> Tutup kas harian dilakukan otomatis setiap pukul 16:30 WIB dengan validasi buku besar.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#c2c6d3]/30 text-right">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-[#1e5aa8] text-white rounded-lg text-[13px] font-semibold"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
