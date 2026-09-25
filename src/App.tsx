import React, { useState } from 'react';
import {
  ViewType,
  Member,
  Transaction,
  LoanApplication,
  DueInstallment,
} from './types';
import {
  INITIAL_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_LOAN_APPLICATIONS,
  INITIAL_DUE_INSTALLMENTS,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardOperasional } from './components/DashboardOperasional';
import { DashboardRingkasan } from './components/DashboardRingkasan';
import { DataAnggotaView } from './components/DataAnggotaView';
import { AjukanPinjamanView } from './components/AjukanPinjamanView';
import { LaporanKeuanganView } from './components/LaporanKeuanganView';
import { SimpananView } from './components/SimpananView';
import { AngsuranView } from './components/AngsuranView';
import { PengaturanView } from './components/PengaturanView';
import {
  NewTransactionModal,
  NewMemberModal,
  ReceiptModal,
  WhatsAppModal,
} from './components/Modals';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard-operasional');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data state
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(INITIAL_LOAN_APPLICATIONS);
  const [dueInstallments, setDueInstallments] = useState<DueInstallment[]>(INITIAL_DUE_INSTALLMENTS);

  // Modal states
  const [newTransactionOpen, setNewTransactionOpen] = useState(false);
  const [newMemberOpen, setNewMemberOpen] = useState(false);
  const [receiptTx, setReceiptTx] = useState<Transaction | null>(null);
  const [whatsAppModalData, setWhatsAppModalData] = useState<{
    memberName: string;
    phone: string;
    amount: number;
    dueDate: string;
  } | null>(null);
  const [selectedMemberForLoan, setSelectedMemberForLoan] = useState<Member | null>(null);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const createdTx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [createdTx, ...prev]);
    showToast(`Transaksi ${createdTx.txNo} berhasil dibukukan ke kas.`);
  };

  const handleAddMember = (newMember: Member) => {
    setMembers((prev) => [newMember, ...prev]);
    showToast(`Anggota baru ${newMember.name} (${newMember.memberNo}) berhasil didaftarkan.`);
  };

  const handleOpenWhatsApp = (due: DueInstallment) => {
    const member = members.find((m) => m.memberNo === due.memberNo) || {
      phone: '0812-3456-7890',
    };
    setWhatsAppModalData({
      memberName: due.memberName,
      phone: member.phone,
      amount: due.amount,
      dueDate: due.dueDate,
    });
  };

  const handleSendWhatsApp = () => {
    if (whatsAppModalData) {
      showToast(`Pengingat WhatsApp berhasil dikirim ke ${whatsAppModalData.memberName}.`);
      setWhatsAppModalData(null);
    }
  };

  const handleSubmitLoan = (loanData: any) => {
    const newApp: LoanApplication = {
      id: `app-${Date.now()}`,
      memberName: loanData.memberName,
      memberNo: loanData.memberNo,
      score: loanData.score,
      initials: loanData.initials,
      avatarBg: loanData.avatarBg,
      tenor: loanData.tenor,
      loanType: loanData.loanType,
      amount: loanData.amount,
      status: 'Menunggu Verifikasi Pengurus',
      statusColor: 'bg-[#a72f2e]',
      actionLabel: 'Review',
    };
    setLoanApplications((prev) => [newApp, ...prev]);
    showToast(`Pengajuan pinjaman ${loanData.memberName} sebesar Rp${loanData.amount.toLocaleString('id-ID')} berhasil diajukan.`);
  };

  const handleReviewLoan = (app: LoanApplication) => {
    if (app.actionLabel === 'Cairkan') {
      const txNo = `TX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      const pencairanTx: Transaction = {
        id: `tx-${Date.now()}`,
        txNo,
        timestamp: '15 Sep 2025, 14:30 WIB',
        date: '15 Sep 2025',
        time: '14:30 WIB',
        memberName: app.memberName,
        memberNo: app.memberNo,
        memberInitials: app.initials,
        memberAvatarBg: app.avatarBg,
        type: `Pencairan ${app.loanType}`,
        category: 'pencairan',
        amount: app.amount,
        isNegative: true,
        channel: 'Transfer Bank BCA',
        channelIcon: 'account_balance',
        status: 'Disetujui',
        runningBalance: 1012400000,
      };
      setTransactions((prev) => [pencairanTx, ...prev]);
      setLoanApplications((prev) => prev.filter((a) => a.id !== app.id));
      showToast(`Pinjaman ${app.memberName} sebesar Rp${app.amount.toLocaleString('id-ID')} berhasil dicairkan.`);
    } else {
      showToast(`Membuka berkas analisis kredit surveyor untuk ${app.memberName}.`);
      setCurrentView('pengajuan-pinjaman');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#151c27] flex">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#151c27] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-[#c2c6d3]/30 animate-in fade-in slide-in-from-bottom-3">
          <span className="material-symbols-outlined text-[#83f894] text-[20px]">
            check_circle
          </span>
          <span className="text-[13px] font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-[#737782] hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Sidebar navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px]">
        <Header
          onOpenNewTransaction={() => setNewTransactionOpen(true)}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />

        <main className="flex-1 pt-[88px] pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          {/* Active View Router */}
          {currentView === 'dashboard' || currentView === 'dashboard-operasional' ? (
            <DashboardOperasional
              transactions={transactions}
              loanApplications={loanApplications}
              onOpenReceipt={setReceiptTx}
              onOpenNewTransaction={() => setNewTransactionOpen(true)}
              onNavigate={setCurrentView}
              onReviewLoan={handleReviewLoan}
            />
          ) : currentView === 'dashboard-ringkasan' ? (
            <DashboardRingkasan
              dueInstallments={dueInstallments}
              onOpenWhatsApp={handleOpenWhatsApp}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'data-anggota' ? (
            <DataAnggotaView
              members={members}
              onOpenNewMember={() => setNewMemberOpen(true)}
              onNavigate={setCurrentView}
              onSelectMemberForLoan={(m) => {
                setSelectedMemberForLoan(m);
                setCurrentView('pengajuan-pinjaman');
              }}
            />
          ) : currentView === 'pengajuan-pinjaman' ? (
            <AjukanPinjamanView
              members={members}
              selectedMember={selectedMemberForLoan}
              onNavigate={setCurrentView}
              onSubmitLoan={handleSubmitLoan}
            />
          ) : currentView === 'laporan-keuangan' ? (
            <LaporanKeuanganView
              transactions={transactions}
              onOpenReceipt={setReceiptTx}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'simpanan-pokok' ? (
            <SimpananView
              type="pokok"
              members={members}
              onOpenNewTransaction={() => setNewTransactionOpen(true)}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'simpanan-wajib' ? (
            <SimpananView
              type="wajib"
              members={members}
              onOpenNewTransaction={() => setNewTransactionOpen(true)}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'simpanan-sukarela' ? (
            <SimpananView
              type="sukarela"
              members={members}
              onOpenNewTransaction={() => setNewTransactionOpen(true)}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'angsuran-pinjaman' ? (
            <AngsuranView
              isHistory={false}
              dueInstallments={dueInstallments}
              transactions={transactions}
              onOpenReceipt={setReceiptTx}
              onOpenWhatsApp={handleOpenWhatsApp}
              onOpenNewTransaction={() => setNewTransactionOpen(true)}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'riwayat-pinjaman' ? (
            <AngsuranView
              isHistory={true}
              dueInstallments={dueInstallments}
              transactions={transactions}
              onOpenReceipt={setReceiptTx}
              onOpenWhatsApp={handleOpenWhatsApp}
              onOpenNewTransaction={() => setNewTransactionOpen(true)}
              onNavigate={setCurrentView}
            />
          ) : currentView === 'pengaturan-akun' ? (
            <PengaturanView onNavigate={setCurrentView} />
          ) : null}
        </main>
      </div>

      {/* Global Modals */}
      <NewTransactionModal
        isOpen={newTransactionOpen}
        onClose={() => setNewTransactionOpen(false)}
        members={members}
        onAddTransaction={handleAddTransaction}
      />

      <NewMemberModal
        isOpen={newMemberOpen}
        onClose={() => setNewMemberOpen(false)}
        onAddMember={handleAddMember}
      />

      <ReceiptModal
        transaction={receiptTx}
        onClose={() => setReceiptTx(null)}
      />

      <WhatsAppModal
        isOpen={!!whatsAppModalData}
        onClose={() => setWhatsAppModalData(null)}
        data={whatsAppModalData}
        onSend={handleSendWhatsApp}
      />
    </div>
  );
}
