
import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';
import { CloseIcon } from './icons/Icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <CloseIcon />
        </button>
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-white">Đăng nhập hoặc Đăng ký</h2>
            <p className="text-center text-gray-400 text-sm">
                Đăng nhập để lưu giọng nói tùy chỉnh và xem lịch sử của bạn.
            </p>
        </div>
        <div className="mt-8">
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                providers={['google']}
                onlyThirdPartyProviders={true}
                theme="dark"
            />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
